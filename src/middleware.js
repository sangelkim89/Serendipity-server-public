export const isAuthenticated = request => {
  //   console.log("request.headers in isAuth : ", request.headers);
  if (!request.user) {
    console.log("test");
    throw Error("You need to log....");
  }
  return;
};
