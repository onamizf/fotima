"""Register through the same public form as a learner; no production auth bypass."""
def register_local(page,base,name='UI Learner',password='lab-test-password'):
 page.goto(base+'#register');page.locator('[name=username]').fill(name);page.locator('[name=password]').fill(password);page.locator('[name=repeat]').fill(password);page.locator('.auth-submit').click();page.wait_for_function('LocalAuth.signedIn() && location.hash==="#catalog"')
