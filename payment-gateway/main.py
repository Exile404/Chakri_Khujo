import os
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sslcommerz_python.payment import SSLCSession
from decimal import Decimal
from fastapi.responses import RedirectResponse, HTMLResponse
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
import webbrowser
import time

app = FastAPI()
load_dotenv()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class PaymentRequest(BaseModel):
    title: str
    name: str
    email: str
    Contact: str
    Category: str
    price: float

@app.get("http://127.0.0.1:8000/failed/", response_class=HTMLResponse)
def payment_failed(request):
    # Handle payment failure
    return HTMLResponse(content="Payment Failed")
@app.get("http://127.0.0.1:8000/cancel/", response_class=HTMLResponse)
def payment_cancel(request):
    # Handle payment cancellation
    return HTMLResponse(content="Payment Cancelled")

@app.get("http://127.0.0.1:8000/payment_notification/", response_class=HTMLResponse)
def payment_notification(request):
    pass





@app.post("/process_payment")
async def process_payment(payment_request: PaymentRequest):
    mypayment = SSLCSession(sslc_is_sandbox=True, sslc_store_id=os.getenv("STORE_ID"),
                            sslc_store_pass=os.getenv("STORE_PASSWORD"))

    mypayment.set_urls(success_url='http://127.0.0.1:8000/success', fail_url='http://127.0.0.1:8000/failed',
                       cancel_url='http://127.0.0.1:8000/cancel', ipn_url='http://127.0.0.1:8000/payment_notification')

    mypayment.set_product_integration(total_amount=Decimal(payment_request.price), currency='BDT',
                                      product_category=payment_request.Category,
                                      product_name=payment_request.title, num_of_item=1, shipping_method='YES',
                                      product_profile='None')

    mypayment.set_customer_info(name=payment_request.name, email=payment_request.email, address1='N/A',
                                city='Dhaka', postcode='N/A', country='Bangladesh',
                                phone=payment_request.Contact)
    mypayment.set_shipping_info(shipping_to=payment_request.name, address='N/A', city='Dhaka', postcode='N/A',
                                country='Bangladesh')

    response = mypayment.init_payment()
    print(response)
    url = response['GatewayPageURL']
    if response['status'] == 'SUCCESS':
        return RedirectResponse(url)

@app.post('/success')
async def payment_success(request: Request):
    if request.method == 'POST':
        ipn_data = await Request.form()
        print(ipn_data['tran_id'])
        return JSONResponse(content={"status": "success", "ipn_data": dict(ipn_data)})