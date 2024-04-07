import { Login, Password, Submit, UserName, notice } from "cui-solid";
import Styles from "./css/login.module.scss";
import { reqLogin } from "@/api/user";
import { loginRequestParamsInf } from "@/api/types/user";
import useUserStore from "@/stores/user";
import { useNavigate } from "@solidjs/router";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserInfo, setToken } = useUserStore().action;

  const login = async (params: loginRequestParamsInf) => {
    const {
      data: { userInfo, token },
    } = await reqLogin(params);
    setUserInfo(userInfo);
    setToken(token);
    navigate("/home");
    notice.success({
      title: `歡迎回來 ${userInfo.account}`,
    });
  };

  return (
    <Login
      onSubmit={(valid, { password, account }) => {
        if (valid) {
          login({ account, password });
        }
      }}
    >
      <div class={Styles["login-wrapper"]}>
        <div class={Styles["login-content"]}>
          <h1>用戶登錄</h1>
          <UserName name="account" />
          <Password name="password" />

          <Submit />
        </div>
      </div>
    </Login>
  );
}
