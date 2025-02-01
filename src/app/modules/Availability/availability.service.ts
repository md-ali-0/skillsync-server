import { Availability, Prisma, Role } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";

const create = async (user: IAuthUser, payload: Availability) => {

    const result = await prisma.availability.create({
        data: { ...payload, teacherId: user?.user },
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

    const andCondions: Prisma.AvailabilityWhereInput[] = [];

    if (user?.role === Role.TEACHER) {
        andCondions.push({
            teacherId: user?.user,
        });
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
    const whereConditons: Prisma.AvailabilityWhereInput = { AND: andCondions };

    const result = await prisma.availability.findMany({
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
    });

    const total = await prisma.availability.count({
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

const getOne = async (id: string): Promise<Availability | null> => {
    const result = await prisma.availability.findUnique({
        where: {
            id,
        },
    });

    return result;
};

const update = async (id: string, data: Partial<Availability>): Promise<Availability> => {
    await prisma.skill.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.availability.update({
        where: {
            id,
        },
        data,
    });

    return result;
};

const remove = async (id: string): Promise<Availability | null> => {
    await prisma.availability.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.availability.delete({
        where: {
            id,
        },
    });

    return result;
};

export const AvailabilityService = {
    create,
    getAll,
    getOne,
    update,
    remove,
};
