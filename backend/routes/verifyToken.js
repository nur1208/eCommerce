const jwt = require("jsonwebtoken");

const isJWTAuth = async (req, res, next) => {
  let token;
  // console.log(`here`);

  // 1 getting token and check if it's there
  console.log(req.headers.token);
  if (req.headers.token && req.headers.token.startsWith("Bearer")) {
    token = req.headers.token.split(" ")[1];
  }

  if (!token || token === "undefined") {
    res.status(401).json({
      status: "fall",
      message: "you are not logged in! Please log in to get access",
    });

    console.log({
      status: "fall",
      message: "you are not logged in! Please log in to get access",
    });

    return;
  }
  // 2 verification token
  const decode = await promisify(jwt.verify)(
    token,

    // eslint-disable-next-line no-undef
    process.env.SECRET_KEY
  );

  // 3 check if user still exists
  const currentUser = await User.findById(decode.id);
  // if the user delete after we send him a token
  // and before the token expired
  // TODO FIX THE ERROR THAT OCCURS BECAUSE THE FOLLOWING CODE
  // WHEN THE USER SIGN UP AND THEN WE AUTO LOG HIM IN
  // if (!currentUser) {
  //   res.status(401).json({
  //     status: "fall",
  //     message:
  //       "The user belonging to this token does no longer exist",
  //   });

  //   console.log({
  //     status: "fall",
  //     message:
  //       "The user belonging to this token does no longer exist",
  //   });
  // }

  console.log({ currentUser });

  // grant access to protected route
  req.user = currentUser;
  next();
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log({ token });
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  isJWTAuth,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
