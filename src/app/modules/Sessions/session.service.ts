import { Prisma, Session } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";

const create = async (user: IAuthUser, payload: Session) => {
    const date = new Date(payload.date);

    const existingSession = await prisma.session.findFirst({
        where: {
            teacherId: payload.teacherId,
            date: date,
        },
    });

    if (existingSession) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "A session already exists for this teacher on this date."
        );
    }

    const skillExists = await prisma.skill.findUnique({
        where: { id: payload.skillId },
    });

    if (!skillExists) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Invalid skillId. Skill does not exist."
        );
    }

    if (!payload.teacherId || !payload.skillId || !date) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Missing required fields for session creation."
        );
    }

    const sessionData = {
        ...payload,
        learnerId: user.user,
        date: date,
    };
    const result = await prisma.session.create({
        data: sessionData,
    });

    return result;
};

const getAll = async (
    user: IAuthUser,
    params: Record<string, unknown>,
    options: IPaginationOptions
) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andCondions: Prisma.SessionWhereInput[] = [];
    if (user.role === "LEARNER") {
        andCondions.push({ learnerId: user.user})
    }
    if (user.role === "TEACHER") {
        andCondions.push({ teacherId: user.user})
    }
    if (params.searchTerm) {
        andCondions.push({
            OR: ["name"].map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    //console.dir(andCondions, { depth: 'inifinity' })
    const whereConditons: Prisma.SessionWhereInput = { AND: andCondions };

    const result = await prisma.session.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? {
                      [options?.sortBy]: options.sortOrder,
                  }
                : {
                      createdAt: "desc",
                  },
        include: {
            skill: true,
            learner: true,
            teacher: true,
            review: true,
        },
    });

    const total = await prisma.session.count({
        where: whereConditons,
    });

    const totalPage = Math.ceil(total / limit);

    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
};

const getOne = async (id: string): Promise<Session | null> => {
    const result = await prisma.session.findUnique({
        where: {
            id,
        },
    });

    return result;
};

const update = async (id: string, data: Partial<Session>): Promise<Session> => {
    await prisma.session.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.session.update({
        where: {
            id,
        },
        data,
    });

    return result;
};

const remove = async (id: string): Promise<Session | null> => {
    await prisma.session.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.session.delete({
        where: {
            id,
        },
    });

    return result;
};

export const SessionService = {
    create,
    getAll,
    getOne,
    update,
    remove,
};
