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

  rest.post<Omit<User, 'id'>, PathParams, User>(`${URL_NAME}/users`, (req, res, ctx) => {
    const add = db.user.create(req.body);
    return res(ctx.json(add));
  }),

  rest.delete<any, any, { id: string }>(
    `${URL_NAME}/users/:id`,
    (req, res, ctx) => {

      const user = db.user.findFirst({
        where: {
          id: {
            equals: req.params.id,
          },
        },
      });

      if (!user) {
        // if there is no user 404
        return res(ctx.status(404));
      }

      db.user.delete({
        where: {
          id: {
            equals: user.id,
          },
        },
      });

      // user deleted 200
      return res(ctx.status(200));
    }
  ),
];
