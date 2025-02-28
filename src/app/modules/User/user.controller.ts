import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../interfaces/common";
import { userFilterableFields } from "./user.constant";
import { userService } from "./user.sevice";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await userService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data,
    });
});

const getAllTeachersFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await userService.getAllTeachersFromDB(filters, options);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data,
    });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users profile status changed!",
        data: result,
    });
});

const getMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
        const user = req.user;
        console.log(user);
        
        const result = await userService.getMyProfile(user as IAuthUser);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "My profile data fetched!",
            data: result,
        });
    }
);

const updateMyProfie = catchAsync(
    async (req: Request & { user?: IAuthUser }, res: Response) => {
        const user = req.user;

        const result = await userService.updateMyProfie(
            user as IAuthUser,
            req.files,
            req.body
        );

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "My profile updated!",
            data: result,
        });
    }
);

const update = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await userService.update(id, req.files, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User data updated!",
        data: result,
    });
});

const DeleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await userService.DeleteUser(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User data deleted!",
        data: result,
    });
});

export const userController = {
    getAllFromDB,
    getAllTeachersFromDB,
    changeProfileStatus,
    getMyProfile,
    updateMyProfie,
    update,
    DeleteUser,
};
