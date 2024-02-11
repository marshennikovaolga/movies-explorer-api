const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const emailRegex = /^\S+@\S+\.\S+$/;
const passwordRegex = /^[a-zA-Z0-9]{4,30}$/

module.exports = {
  urlRegex,
  passwordRegex,
  emailRegex,
};
