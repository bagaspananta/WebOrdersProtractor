//Suite in Jasmine
describe('Demo Web Order Test', function() { 
  
  function login(){
    browser.waitForAngularEnabled(false);
    browser.get('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/');
    // Enter the username and password
    element(by.name('ctl00$MainContent$username')).sendKeys('Tester');
    element(by.name('ctl00$MainContent$password')).sendKeys('test')
    // Clicks on 'Login' button
    element(by.id('ctl00_MainContent_login_button')).click();
  };

  function logout(){
  	element(by.id('ctl00_logout')).click();
  }

  it('Login and Logout test', function() { 
    // Entering application url in browser
    login();
    //check that we are on the dashboard
    expect(element(by.id('ctl00_menu')).getText()).toEqual("View all orders\nView all products\nOrder");
    //log out 
    logout();
  });

  it('Placing a new order', function() { 
    // Entering application url in browser
    login();
    //click the order link
    element(by.xpath("//*[@id='ctl00_menu']/li[3]/a")).click();
    element(by.id('ctl00_MainContent_fmwOrder_txtQuantity')).sendKeys('5');
    element(by.id('ctl00_MainContent_fmwOrder_txtName')).sendKeys('banantaprotractor');
    element(by.id('ctl00_MainContent_fmwOrder_TextBox2')).sendKeys('Watson Road');
    element(by.id('ctl00_MainContent_fmwOrder_TextBox3')).sendKeys('Melbourne');
    element(by.id('ctl00_MainContent_fmwOrder_TextBox5')).sendKeys('3150');

    //fill in the payment details
    element(by.id('ctl00_MainContent_fmwOrder_cardList_0')).click();
    element(by.id('ctl00_MainContent_fmwOrder_TextBox6')).sendKeys('12345678901238');
    element(by.id('ctl00_MainContent_fmwOrder_TextBox1')).sendKeys('02/2019');

    //click the process button
    element(by.id('ctl00_MainContent_fmwOrder_InsertButton')).click();
    expect(element(by.css('.buttons_process')).getText()).toEqual("Process\n\n\nNew order has been successfully added.");
    logout();
  });

  it('Updating and Deleting a new order', function() { 
  	  login();
  	  //click the first order to edit
  	  element(by.xpath("//*[@id='ctl00_MainContent_orderGrid']/tbody/tr[2]/td[13]/input")).click();
  	  //change the customer name to "Paul brown test3"
  	  element(by.id('ctl00_MainContent_fmwOrder_txtName')).sendKeys("Paul Brown test3");
  	  //Update the data
  	  element(by.id('ctl00_MainContent_fmwOrder_UpdateButton')).click();
  	  //and the customer name should be changed to Paul Brown test3
  	  expect(element(by.xpath("//*[@id='ctl00_MainContent_orderGrid']/tbody/tr[2]/td[2]")).getText()).toEqual("Paul BrownPaul Brown test3");

  	  //deleting the data
  	  
  	  element(by.id('ctl00_MainContent_orderGrid_ctl02_OrderSelector')).click();
  	  element(by.id('ctl00_MainContent_btnDelete')).click();
  	  expect(element(by.xpath("//*[@id='ctl00_MainContent_orderGrid']/tbody/tr[2]/td[2]")).getText()).not.toEqual("Paul BrownPaul Brown test3")
  }); 

});

