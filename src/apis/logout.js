import axios from "axios";

export const logout = async () => {
  const result = await axios.post("https://kim-sun-woo/api/admin/logout", {
    headers: { Autoriaztion: `Bearer ${localStorage.getItem("access")}` },
    withCedentials: true,
  });
  return result.data;
};
