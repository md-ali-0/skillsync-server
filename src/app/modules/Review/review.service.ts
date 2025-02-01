import { Prisma, Review } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";

const create = async (user: IAuthUser, payload: Review) => {

    const result = await prisma.review.create({
        data: { ...payload, learnerId: user?.user },
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

    const andCondions: Prisma.ReviewWhereInput[] = [];

    if (user?.role === "LEARNER") {
        andCondions.push({
            learnerId: user?.user,
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
    const whereConditons: Prisma.ReviewWhereInput = { AND: andCondions };

    const result = await prisma.review.findMany({
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

    const total = await prisma.review.count({
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

const getOne = async (id: string): Promise<Review | null> => {
    const result = await prisma.review.findUnique({
        where: {
            id,
        },
    });

    return result;
};

const update = async (id: string, data: Partial<Review>): Promise<Review> => {
    await prisma.review.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.review.update({
        where: {
            id,
        },
        data,
    });

    return result;
};

const remove = async (id: string): Promise<Review | null> => {
    await prisma.review.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.review.delete({
        where: {
            id,
        },
    });

    return result;
};

export const ReviewService = {
    create,
    getAll,
    getOne,
    update,
    remove,
};
