// import { UseGuards, applyDecorators } from '@nestjs/common';
// import {
//   ApiBadRequestResponse,
//   ApiForbiddenResponse,
//   ApiNotImplementedResponse,
//   ApiUnauthorizedResponse,
// } from '@nestjs/swagger';
// import { VerifiedTokenErrorDto } from './dto/verified-token-error.dto';
// // import { AuthGuard } from './auth.guard';

// export function Auth() {
//   return applyDecorators(
//     // UseGuards(AuthGuard),
//     ApiUnauthorizedResponse({
//       type: VerifiedTokenErrorDto,
//     }),
//     ApiNotImplementedResponse({
//       type: VerifiedTokenErrorDto,
//     }),
//     ApiBadRequestResponse({
//       type: VerifiedTokenErrorDto,
//     }),
//     ApiForbiddenResponse({
//       type: VerifiedTokenErrorDto,
//     }),
//   );
// }
