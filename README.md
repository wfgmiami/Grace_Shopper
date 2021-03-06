# Grace Shopper

Due Date: May 9, 2017

----

## Site:
[Grace Shopper](http://grace-shopper.herokuapp.com)

----

## Requirements

### Users

#### Unauthenticated Users:

* [x] View products (catalog)
 * [x] Refine listing by category
 * [x] Search product listing
 * [x] View a product's details
 * [x] Product information
 * [x] Photo(s)
 * [x] View reviews left by authenticated users
* [ ] Manage their cart
 * [x] Add an item to the cart from product listing or product detail pages
 * [x] Remove an item from the cart
 * [ ] Edit/update quantities of items in the cart
 * [x] Log in and continue editing the cart
 * [x] Refresh the page without being logged in and have the cart persist (you may use sessionStorage, localStorage, Cookies or JWT for this)
* [x] Account Management
 * [x] Create an account
 * [x] Login with Facebook and/or Google
* [ ] Checkout
 * [ ] Purchase items from cart
 * [ ] Specify shipping address and email address
 * [ ] Receive confirmation email
 * [ ] Receive notification emails upon order shipping, then order delivery

#### Authenticated Users:
* [x] Logout
* [ ] Account management
 * [x] View past order list
 * [x] View order detail
 * [x] Current order status
 * [x] Items with quantity and subtotal
 * [x] Link to the original product detail page
 * [ ] Date/time order was created
* [ ] Product reviews
 * [ ] Leave a review (with text and a 5-star rating) for a product

#### Admin Users:
* [ ] Product management
 * [ ] Create and edit products with name, description, price and one or more photos
 * [ ] Create categories for items, each item can have multiple categories
 * [ ] Manage the availability of a product. If a product is no longer available, users will not see it while browsing, but they can view the product detail page if they've ordered it previously or have a direct link. On that product detail page, it should say "Currently Unavailable"
 * [ ] Add/remove categories from items
* [x] Order management
 * [x] View a list of all orders
 * [x] Filter orders by status (Created, Processing, Cancelled, Completed)
 * [x] Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
 * [x] View details of a specific order
* [x] User management
 * [x] Promote other user accounts to have admin status
 * [x] Delete a user
 * [x] Trigger password reset for a user (next time they successfully log in—with their old password—they are prompted for a new one)

### Data Validations

#### Products

* [x] Must have title, description, price, and inventory quantity
* [x] Must belong to at least one category
* [ ] If there is no photo, there must be a placeholder photo used

#### Users

* [x] Users must have a valid email address
* [x] Users email must be unique

#### Order

* [ ] Orders must belong to a user OR guest session (authenticated vs unauthenticated)
* [x] Orders must contain line items that capture the price, current product ID and quantity
* [ ] If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

#### Reviews

* [x] All reviews must belong to a product
* [x] All reviews must belong to a user
* [x] All reviews must be at least X characters

----

### Evaluation

* Feature completeness
* Code quality and general best practices in front-end and back-end
* Project management and effective use of Git
* Quality of unit tests
* Schema design
* RESTfulness of routes
* DRY
* Effectively separating functionality with dumb/presentational components, smart/container components, async action creators, etc.
* UI/site usability
* Security
* Design/visual appeal
