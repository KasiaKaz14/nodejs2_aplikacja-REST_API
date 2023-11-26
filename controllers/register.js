import md5 from "md5";

function registerUser(email, password) {
  const userEmailHash = md5(email.trim().toLowerCase());

  const avatarURL = `https://www.gravatar.com/avatar/${userEmailHash}`;

  const user = {
    email: email,
    password: password,
    avatarURL: avatarURL,
  };
}

export { registerUser };
