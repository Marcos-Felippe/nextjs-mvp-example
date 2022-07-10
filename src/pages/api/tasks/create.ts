import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const { title } = req.body;

    const task = await prisma.task.create({
        data: {
            title,
            isDone: false,
        }
    });

    return res.status(201).json(task);
}