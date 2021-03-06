export class User {
  constructor ({
    id = null,
    firstname = '',
    lastname = '',
    email = '',
    isActive = false,
    role = null,
    createdAt = null,
    updatedAt = null
  }) {
    this._id = id
    this._firstName = firstname
    this._lastName = lastname
    this._email = email
    this._isActive = isActive
    this._role = role
    this._createdAt = createdAt && new Date(createdAt)
    this._updatedAt = updatedAt && new Date(updatedAt)
  }

  // Getters and Setters
  // ID
  set id (id = null) { this._id = id }
  get id () { return this._id }

  // First Name
  set firstName (firstName = '') { this._firstName = firstName }
  get firstName () { return this._firstName }

  // Last name
  set lastName (lastName = '') { this._lastName = lastName }
  get lastName () { return this._lastName }

  // Full name
  get fullName () { return this._firstName + ' ' + this._lastName }

  // Email
  set email (email) { this._email = email }
  get email () { return this._email }

  // isActive
  set isActive (isActive) { this._isActive = isActive }
  get isActive () { return this._isActive }

  // role
  set role (role) { this._role = role }
  get role () { return this._role }

  // createdAt
  get createdAt () { return this._createdAt }

  // updatedAt
  get updatedAt () { return this._updatedAt }

  toJSON () {
    return {
      id: this._id,
      firstname: this._firstName,
      lastname: this._lastName,
      email: this._email,
      isActive: this._isActive,
      role: this._role
    }
  }
}
