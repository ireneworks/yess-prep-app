import axios from "axios";

const requester = axios.create({
  baseURL: "/v1",
  headers: {
    "x-api-key":
      "live_k77YJ1Sa3RsUfqEwbuKzrsevPSBW7iCoeeTZKSuj0ahl51TyYwbMXoLhVwwyIIvF",
  },
});

export default requester;
