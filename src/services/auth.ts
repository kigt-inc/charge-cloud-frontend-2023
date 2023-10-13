import { httpRequest } from "@/lib/httpRequest";

interface ISignInResponse {
  isSuccess: boolean;
  data: {
    user_id: number;
    merchant_id: number | null;
    user_status: "string";
    first_name: string;
    last_name: string;
    email: string;
    phone_no: string;
    type: string | null;
    reset_link_token: string | null;
    exp_date: string | null;
    online_access: string;
    cust_admin: string;
    deleted_timestamp: "0";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    role: string;
    token: string;
  };
  message: "User signed In";
}

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    let response = await httpRequest<ISignInResponse>({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/signin`,
      options: {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      },
    });

    let accessToken = response.data.token;
    localStorage.setItem("auth", JSON.stringify(accessToken));

    return response;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  localStorage.removeItem("auth");
  window.location.href = "/signin";
};
