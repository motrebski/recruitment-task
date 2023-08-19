export type User = {
  id: number;
  name: string;
  username: string
  email: string;
  city: string;
};

export const URL_NAME = "https://example.com";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${URL_NAME}/users`);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error if get users");
  }
};

export const getUser = async (id: any): Promise<void> => {
  const response = await fetch(`${`${URL_NAME}/users`}/${id}`);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error if get user");
  }
};

export const addUser = async (user: any): Promise<void> => {
  const response = await fetch(`${URL_NAME}/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error if add user");
  }
};

export const editUser = async (user: any, id: number): Promise<void> => {
  const response = await fetch(`${URL_NAME}/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error if edit user");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${`${URL_NAME}/users`}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error if delete user");
  }
};
