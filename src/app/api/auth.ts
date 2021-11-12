import axios from "axios";
import { baseURL } from "./baseURL";

const URL = `${baseURL}/accounts`;

type TServerResponse = { token: string };
type TSignUpBody = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export const signin = (username: string, password: string) =>
  axios.post<TServerResponse>(`${URL}/login`, {
    username,
    password,
  });

export const signup = (body: TSignUpBody) =>
  axios.post<TServerResponse>(`${URL}/signup`, {
    ...body,
  });
