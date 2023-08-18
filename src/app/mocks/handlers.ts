import { rest, DefaultBodyType, PathParams } from "msw";
import { URL_NAME, User } from "../api/user";
import { db } from "./db";

export const handlers = [
  rest.get<DefaultBodyType, PathParams, User[]>(
    `${URL_NAME}/users`,
    (_req, res, ctx) => {
      const users = db.user.getAll();
      return res(ctx.json(users));
    }
  ),

  rest.get<DefaultBodyType, PathParams, User[]>(
    `${URL_NAME}/users/:id`,
    (_req, res, ctx) => {
      const user = db.user.findFirst({
        where: {
          id: {
            equals: parseInt(_req.params.id as any),
          },
        },
      });
      return res(ctx.json(user as any));
    }
  ),

  rest.post<Omit<User, 'id'>, PathParams, User>(`${URL_NAME}/users`, (req, res, ctx) => {
    const add = db.user.create(JSON.parse(req.body as any));
    return res(ctx.json(add));
  }),

  rest.put<any, { id: any }, User>(`${URL_NAME}/users/:id`, (req, res, ctx) => {
    const updated = db.user.update({
      where: { id: { equals: parseInt(req.params.id) } },
      data: JSON.parse(req.body as any),
    });
    return res(ctx.json(updated!));
  }),

  rest.delete<any, any, { id: any }>(
    `${URL_NAME}/users/:id`,
    (req, res, ctx) => {
      const user = db.user.findFirst({
        where: {
          id: {
            equals: parseInt(req.params.id),
          },
        },
      });

      if (!user) {
        return res(ctx.status(404));
      }

      db.user.delete({
        where: {
          id: {
            equals: user.id,
          },
        },
      });

      return res(ctx.status(200));
    }
  ),
];
