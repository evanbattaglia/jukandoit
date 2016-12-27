const initialStateFilelist = {
  directory: '/', // null?
  files: [
    {name: "hello", type: "world"},
  ],
  loading: true,
};
function filelist(state = initialStateFilelist, action) {
  // enter directory...
  return state;
}

export default filelist;
