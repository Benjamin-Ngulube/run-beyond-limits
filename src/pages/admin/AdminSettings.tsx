
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const AdminSettings = () => {
  const [emailTestStatus, setEmailTestStatus] = useState<null | "success" | "error">(null);
  
  // Mock function to simulate testing email connection
  const testEmailConnection = () => {
    // Simulate API call delay
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3;
      setEmailTestStatus(success ? "success" : "error");
    }, 1500);
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Settings</h1>
        <p className="text-gray-600">Configure system settings and preferences.</p>
      </header>

      <Tabs defaultValue="general" className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TabsList className="border-b w-full rounded-t-lg bg-gray-50 p-0">
          <TabsTrigger value="general" className="flex-1 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">General</TabsTrigger>
          <TabsTrigger value="email" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Email Settings</TabsTrigger>
          <TabsTrigger value="registration" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Registration</TabsTrigger>
          <TabsTrigger value="payment" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Payment</TabsTrigger>
          <TabsTrigger value="users" className="flex-1 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Admin Users</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="p-6">
          <form className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Website Settings</h2>
              
              <div className="grid gap-2">
                <label htmlFor="site-name" className="text-sm">Website Name</label>
                <Input id="site-name" defaultValue="Marathon 2025" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="site-description" className="text-sm">Website Description</label>
                <Textarea 
                  id="site-description" 
                  className="min-h-[80px]"
                  defaultValue="Zambia's premier marathon event happening on June 21, 2025"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="site-logo" className="text-sm">Website Logo</label>
                <div className="flex items-center gap-4">
                  <Input id="site-logo" type="file" accept="image/*" />
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Logo</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="site-favicon" className="text-sm">Favicon</label>
                <div className="flex items-center gap-4">
                  <Input id="site-favicon" type="file" accept="image/*" />
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500">Fav</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Social Media Links</h2>
              
              <div className="grid gap-2">
                <label htmlFor="facebook-url" className="text-sm">Facebook URL</label>
                <Input id="facebook-url" type="url" placeholder="https://facebook.com/..." />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="instagram-url" className="text-sm">Instagram URL</label>
                <Input id="instagram-url" type="url" placeholder="https://instagram.com/..." />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="twitter-url" className="text-sm">Twitter URL</label>
                <Input id="twitter-url" type="url" placeholder="https://twitter.com/..." />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="youtube-url" className="text-sm">YouTube URL</label>
                <Input id="youtube-url" type="url" placeholder="https://youtube.com/..." />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              
              <div className="grid gap-2">
                <label htmlFor="contact-email" className="text-sm">Contact Email</label>
                <Input id="contact-email" type="email" defaultValue="info@marathon2025.com" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="contact-phone" className="text-sm">Contact Phone</label>
                <Input id="contact-phone" defaultValue="+260 97X XXX XXX" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="contact-address" className="text-sm">Office Address</label>
                <Textarea 
                  id="contact-address" 
                  className="min-h-[80px]"
                  defaultValue="123 Independence Avenue, Lusaka, Zambia"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </form>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email" className="p-6">
          <form className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Email Provider Settings</h2>
              
              <div className="grid gap-2">
                <label htmlFor="mail-provider" className="text-sm">Mail Provider</label>
                <select id="mail-provider" className="bg-background border rounded-md h-10 px-3">
                  <option value="smtp">SMTP Server</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailchimp">Mailchimp</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="mail-host" className="text-sm">SMTP Host</label>
                <Input id="mail-host" defaultValue="smtp.example.com" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="mail-port" className="text-sm">SMTP Port</label>
                  <Input id="mail-port" defaultValue="587" />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="mail-encryption" className="text-sm">Encryption</label>
                  <select id="mail-encryption" className="bg-background border rounded-md h-10 px-3">
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="mail-username" className="text-sm">SMTP Username</label>
                <Input id="mail-username" defaultValue="notifications@marathon2025.com" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="mail-password" className="text-sm">SMTP Password</label>
                <Input id="mail-password" type="password" defaultValue="********" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="sender-email" className="text-sm">Sender Email</label>
                <Input id="sender-email" type="email" defaultValue="no-reply@marathon2025.com" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="sender-name" className="text-sm">Sender Name</label>
                <Input id="sender-name" defaultValue="Marathon 2025 Team" />
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={testEmailConnection}
                  disabled={emailTestStatus === "success" || emailTestStatus === "error"}
                >
                  Test Connection
                  {emailTestStatus === "success" && 
                    <span className="ml-2 text-green-500">✓ Connected</span>
                  }
                  {emailTestStatus === "error" && 
                    <span className="ml-2 text-red-500">× Failed</span>
                  }
                </Button>
                <Button>Save Email Settings</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Email Templates</h2>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Registration Confirmation Email</h3>
                  <Button variant="outline" size="sm">Edit Template</Button>
                </div>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-700">
                    <strong>Subject:</strong> Your Marathon 2025 Registration Confirmation<br /><br />
                    <strong>Preview:</strong> Thank you for registering for Marathon 2025! Your registration ID is {"{registration_id}"}...
                  </p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Payment Confirmation Email</h3>
                  <Button variant="outline" size="sm">Edit Template</Button>
                </div>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-700">
                    <strong>Subject:</strong> Marathon 2025 - Payment Confirmation<br /><br />
                    <strong>Preview:</strong> We've received your payment for Marathon 2025! Here are your registration details...
                  </p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Event Reminder Email</h3>
                  <Button variant="outline" size="sm">Edit Template</Button>
                </div>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-700">
                    <strong>Subject:</strong> Marathon 2025 is Just a Week Away!<br /><br />
                    <strong>Preview:</strong> The big day is approaching! Here's everything you need to know before race day...
                  </p>
                </div>
              </div>
            </div>
          </form>
        </TabsContent>
        
        {/* Registration Settings */}
        <TabsContent value="registration" className="p-6">
          <form className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Registration Settings</h2>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="registration-open" className="h-4 w-4" defaultChecked />
                <label htmlFor="registration-open">Registration is currently open</label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="registration-start" className="text-sm">Registration Start Date</label>
                  <Input id="registration-start" type="date" defaultValue="2024-10-01" />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="registration-end" className="text-sm">Registration End Date</label>
                  <Input id="registration-end" type="date" defaultValue="2025-06-01" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="registration-limit" className="text-sm">Participant Limit</label>
                <Input id="registration-limit" type="number" defaultValue="5000" />
                <p className="text-xs text-gray-500">Set to 0 for no limit</p>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="required-fields" className="text-sm">Required Registration Fields</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input type="checkbox" id="field-name" className="h-4 w-4 mr-2" defaultChecked />
                    <label htmlFor="field-name">Full Name</label>
                  </div>
                  <div>
                    <input type="checkbox" id="field-email" className="h-4 w-4 mr-2" defaultChecked />
                    <label htmlFor="field-email">Email</label>
                  </div>
                  <div>
                    <input type="checkbox" id="field-phone" className="h-4 w-4 mr-2" defaultChecked />
                    <label htmlFor="field-phone">Phone</label>
                  </div>
                  <div>
                    <input type="checkbox" id="field-address" className="h-4 w-4 mr-2" defaultChecked />
                    <label htmlFor="field-address">Address</label>
                  </div>
                  <div>
                    <input type="checkbox" id="field-tshirt" className="h-4 w-4 mr-2" defaultChecked />
                    <label htmlFor="field-tshirt">T-Shirt Size</label>
                  </div>
                  <div>
                    <input type="checkbox" id="field-dob" className="h-4 w-4 mr-2" />
                    <label htmlFor="field-dob">Date of Birth</label>
                  </div>
                  <div>
                    <input type="checkbox" id="field-emergency" className="h-4 w-4 mr-2" />
                    <label htmlFor="field-emergency">Emergency Contact</label>
                  </div>
                  <div>
                    <input type="checkbox" id="field-medical" className="h-4 w-4 mr-2" />
                    <label htmlFor="field-medical">Medical Info</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Available Race Categories</h2>
              
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Full Marathon (42KM)</div>
                    <div>
                      <input type="checkbox" id="race-42k" className="h-4 w-4 mr-1" defaultChecked />
                      <label htmlFor="race-42k">Active</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-1">
                      <label htmlFor="price-42k" className="text-xs">Price (ZMW)</label>
                      <Input id="price-42k" defaultValue="500" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="limit-42k" className="text-xs">Participant Limit</label>
                      <Input id="limit-42k" defaultValue="1000" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="start-time-42k" className="text-xs">Start Time</label>
                      <Input id="start-time-42k" type="time" defaultValue="06:00" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Half Marathon (21KM)</div>
                    <div>
                      <input type="checkbox" id="race-21k" className="h-4 w-4 mr-1" defaultChecked />
                      <label htmlFor="race-21k">Active</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-1">
                      <label htmlFor="price-21k" className="text-xs">Price (ZMW)</label>
                      <Input id="price-21k" defaultValue="350" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="limit-21k" className="text-xs">Participant Limit</label>
                      <Input id="limit-21k" defaultValue="2000" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="start-time-21k" className="text-xs">Start Time</label>
                      <Input id="start-time-21k" type="time" defaultValue="06:30" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">10KM Run</div>
                    <div>
                      <input type="checkbox" id="race-10k" className="h-4 w-4 mr-1" defaultChecked />
                      <label htmlFor="race-10k">Active</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-1">
                      <label htmlFor="price-10k" className="text-xs">Price (ZMW)</label>
                      <Input id="price-10k" defaultValue="200" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="limit-10k" className="text-xs">Participant Limit</label>
                      <Input id="limit-10k" defaultValue="2500" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="start-time-10k" className="text-xs">Start Time</label>
                      <Input id="start-time-10k" type="time" defaultValue="07:00" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">5KM Fun Run</div>
                    <div>
                      <input type="checkbox" id="race-5k" className="h-4 w-4 mr-1" defaultChecked />
                      <label htmlFor="race-5k">Active</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-1">
                      <label htmlFor="price-5k" className="text-xs">Price (ZMW)</label>
                      <Input id="price-5k" defaultValue="100" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="limit-5k" className="text-xs">Participant Limit</label>
                      <Input id="limit-5k" defaultValue="3000" />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="start-time-5k" className="text-xs">Start Time</label>
                      <Input id="start-time-5k" type="time" defaultValue="07:30" />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm">+ Add Race Category</Button>
            </div>
            
            <div className="flex justify-end">
              <Button>Save Registration Settings</Button>
            </div>
          </form>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payment" className="p-6">
          <form className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Mobile Money</h3>
                      <p className="text-sm text-gray-600">Accept payments through mobile money providers.</p>
                    </div>
                    <div>
                      <input type="checkbox" id="mobile-money" className="h-4 w-4 mr-1" defaultChecked />
                      <label htmlFor="mobile-money">Enabled</label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <label htmlFor="airtel-money" className="text-sm">Airtel Money Number</label>
                      <Input id="airtel-money" defaultValue="+260 97X XXX XXX" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="mtn-money" className="text-sm">MTN Money Number</label>
                      <Input id="mtn-money" defaultValue="+260 96X XXX XXX" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="zamtel-money" className="text-sm">Zamtel Money Number</label>
                      <Input id="zamtel-money" defaultValue="+260 95X XXX XXX" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Bank Transfer</h3>
                      <p className="text-sm text-gray-600">Accept direct bank transfers.</p>
                    </div>
                    <div>
                      <input type="checkbox" id="bank-transfer" className="h-4 w-4 mr-1" defaultChecked />
                      <label htmlFor="bank-transfer">Enabled</label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <label htmlFor="bank-name" className="text-sm">Bank Name</label>
                      <Input id="bank-name" defaultValue="First National Bank (FNB)" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="account-name" className="text-sm">Account Name</label>
                      <Input id="account-name" defaultValue="Marathon 2025 Ltd" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="account-number" className="text-sm">Account Number</label>
                        <Input id="account-number" defaultValue="1234567890" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="branch-code" className="text-sm">Branch Code</label>
                        <Input id="branch-code" defaultValue="260123" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">PayPal</h3>
                      <p className="text-sm text-gray-600">Accept international payments via PayPal.</p>
                    </div>
                    <div>
                      <input type="checkbox" id="paypal" className="h-4 w-4 mr-1" />
                      <label htmlFor="paypal">Enabled</label>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="paypal-email" className="text-sm">PayPal Email</label>
                    <Input id="paypal-email" type="email" placeholder="your@paypal-email.com" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Payment Verification</h2>
              
              <div className="grid gap-2">
                <label htmlFor="verify-option" className="text-sm">Payment Verification Method</label>
                <select id="verify-option" className="bg-background border rounded-md h-10 px-3">
                  <option value="manual">Manual Verification (Review Uploads)</option>
                  <option value="auto">Automatic API Verification</option>
                  <option value="hybrid">Hybrid (Auto + Manual for Exceptions)</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="payment-instructions" className="text-sm">Payment Instructions</label>
                <Textarea 
                  id="payment-instructions" 
                  className="min-h-[120px]"
                  defaultValue="Please follow these steps to complete your payment:
1. Transfer the registration fee to any of our payment methods listed below.
2. Take a screenshot or photo of your payment confirmation.
3. Upload the proof of payment when prompted during registration.
4. Our team will verify your payment within 24 hours.
5. You will receive a confirmation email once your payment is verified."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Currency Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="primary-currency" className="text-sm">Primary Currency</label>
                  <select id="primary-currency" className="bg-background border rounded-md h-10 px-3">
                    <option value="ZMW">Zambian Kwacha (ZMW)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="exchange-rate-usd" className="text-sm">USD Exchange Rate (1 USD = ? ZMW)</label>
                  <Input id="exchange-rate-usd" defaultValue="23.50" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>Save Payment Settings</Button>
            </div>
          </form>
        </TabsContent>
        
        {/* Admin Users */}
        <TabsContent value="users" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Admin Users</h2>
            <Button>Add New User</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>David Mbewe</CardTitle>
                <CardDescription>Event Director</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span>david@marathon2025.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Role:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">Super Admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last login:</span>
                    <span>Today at 10:45 AM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">Deactivate</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Caroline Tembo</CardTitle>
                <CardDescription>Logistics Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span>caroline@marathon2025.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Role:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">Admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last login:</span>
                    <span>Yesterday at 3:20 PM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">Deactivate</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emmanuel Chilufya</CardTitle>
                <CardDescription>Financial Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span>emmanuel@marathon2025.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Role:</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">Finances</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last login:</span>
                    <span>May 15, 2025 at 9:10 AM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">Deactivate</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Nancy Katongo</CardTitle>
                <CardDescription>Registration Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span>nancy@marathon2025.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Role:</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-medium">Registration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last login:</span>
                    <span>May 12, 2025 at 11:45 AM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">Deactivate</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8 space-y-6">
            <h2 className="text-lg font-semibold">User Roles</h2>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Super Admin</h3>
                <p className="text-sm text-gray-600 mb-4">Full access to all system features and settings.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage Users
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    System Settings
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage Participants
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage Content
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage Results
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Financial Tools
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Admin</h3>
                  <Button variant="outline" size="sm">Edit Role</Button>
                </div>
                <p className="text-sm text-gray-600 mb-4">General administrative access without system settings.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Manage Users
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    System Settings
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage Participants
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage Content
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage Results
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Financial Tools
                  </div>
                </div>
              </div>
              
              <Button variant="outline">+ Add Custom Role</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
