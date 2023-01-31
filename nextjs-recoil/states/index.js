import { atom, selector } from "recoil";
import axios from "axios";

export const pageNameState = atom({
  key: "pageNameState",
  default: "",
});

export const getNameSelector = selector({
  key: "getNameSelector",
  get: async () => {
    const res = await axios.get("http://localhost:3000/api/hello");
    return res.data; //res 모두 리턴하면 run time error 발생함. (dev환경에서)
  },
});
