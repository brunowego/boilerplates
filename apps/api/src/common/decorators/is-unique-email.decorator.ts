import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

import { Injectable } from '@nestjs/common'
import { UserService } from '@/modules/user/user.service'

export function IsUniqueEmail(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      name: 'IsUniqueEmail',
      target: object.constructor,
      propertyName,
      options,
      validator: IsUniqueEmailConstraint,
    })
}

@ValidatorConstraint({ name: 'isUniqueEmail', async: true })
@Injectable()
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string, args: ValidationArguments) {
    return await this.userService.exists(args.property, email)
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `${validationArguments.value} is taken, please try another`
  }
}
