import axios from "axios";

export const logout = async () => {
  const result = await axios.post("http://13.209.218.51/api/admin/logout", {
    headers: { Autoriaztion: `Bearer ${localStorage.getItem("access")}` },
    withCedentials: true,
  });
  return result.data;
};
