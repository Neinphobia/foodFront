import swal from "sweetalert";
const getUserInfo = () => {
  const userJson = localStorage.getItem("user");

  // Check if userJson is null or undefined
  if (userJson === null || userJson === undefined) {
    console.log("its either null or undefined.");
    return null;
  }

  try {
    const parsedUser = JSON.parse(userJson); //THEN TRY TO PARSE EVEN THO WE KNOW THIS WILL THROW AN ERROR

    // Check if parsedUser is an object
    if (typeof parsedUser === "object" && parsedUser !== null) {
      return parsedUser;
    } else {
      console.error("Invalid userJson format:", userJson);
      return null;
    }
  } catch (error) {
    //we know its json parse error.
    console.log(error);
    swal(`You need to log in first.`, {
      buttons: false,
      timer: 2000,
      icon: "error",
    });

    return null;
  }
};

export { getUserInfo };
