import winston from "winston";

export default ( err, req, res, next ) => {
  winston.error( err.message, err );

  res.status( 500 ).json( err.message );
}