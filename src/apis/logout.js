import axios from "axios";

export const logout = async () => {
  const result = await axios.post("http://localhost:8080/api/admin/logout", {
    headers: { Autoriaztion: `Bearer ${localStorage.getItem("access")}` },
    withCedentials: true,
  });
  return result.data;
};
