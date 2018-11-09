
export const service = {
    getData
};

function getData() {
    const user = {
        isRegistered: "false"} // "true","false","pending"
  return Promise.resolve(user)

}
