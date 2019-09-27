require("dotenv-expand")(require("dotenv").config());

import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";
import jwt from "jsonwebtoken";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });

    if (user !== null) return done(null, user);
    else return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

// express middleware
export const authenticateJWT = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) req.user = user;
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
