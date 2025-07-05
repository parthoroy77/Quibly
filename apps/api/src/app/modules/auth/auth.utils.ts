import { compare, hash } from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { importJWK, JWTPayload, jwtVerify, SignJWT } from "jose";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";

const hashPassword = async (password: string) => {
  try {
    return await hash(password, Number(config.salt_rounds));
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to hash password");
  }
};

const comparePassword = async (password: string, hashPassword: string) => {
  try {
    return await compare(password, hashPassword);
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to compare password");
  }
};

const generateToken = async (payload: JWTPayload, secret: string, expiry: string) => {
  // Import the secret as a JWK key
  const signedKey = await importJWK({ k: secret, alg: "HS256", kty: "oct" });
  // generate the token
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(signedKey);

  // return token
  return token;
};

const generateSessionAndRefreshToken = async (id: string) => {
  const newSessionToken = await generateToken(
    { userId: id },
    config.jwt_access_secret!,
    config.jwt_access_token_expires_in!
  );

  const newRefreshToken = await generateToken(
    { userId: id },
    config.jwt_refresh_secret!,
    config.jwt_refresh_token_expires_in!
  );

  return {
    newSessionToken,
    newRefreshToken,
  };
};

const verifyToken = async (token: string, secret: string): Promise<JWTPayload | null> => {
  try {
    // Import the secret as a JWK key
    const key = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

    // Verify the token
    const { payload } = await jwtVerify(token, key);

    // If verification is successful, return the payload
    return payload;
  } catch (error) {
    return null;
  }
};

export { comparePassword, generateSessionAndRefreshToken, generateToken, hashPassword, verifyToken };
