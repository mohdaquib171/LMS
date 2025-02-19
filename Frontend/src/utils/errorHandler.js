export const handleError = (error) => {
  if (error.response && error.response.data) {
    console.error(error.response.data);
    alert(error.response.data.message || "An error occured!");
  } else {
    console.error(error.message);
    alert("A network error occured. Please try again");
  }
};

