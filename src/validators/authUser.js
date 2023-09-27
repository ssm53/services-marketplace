export function validateUserLogin(input) {
    const validationErrors = {}
   
    if (!('email' in input) || input['email'].length == 0) {
      validationErrors['email'] = 'cannot be blank'
    }
  
    if (!('password' in input) || input['password'].length == 0) {
      validationErrors['password'] = 'cannot be blank'
    }
  
    if ('password' in input && input['password'].length < 8) {
      validationErrors['password'] = 'should be at least 8 characters'
    }
  
    if ('email' in input && !input['email'].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      validationErrors['email'] = 'is invalid'
    }
  
    return validationErrors
  }




