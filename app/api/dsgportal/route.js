
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {RowMutations} from './RowMutations';

import listRowMutationsKeys from './MutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { Add, Update } from './DbGateway';


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const encodedMutations = searchParams.get('mutations');

    let requestedMutationsObj = {};
    if (encodedMutations) {
      try {
        const decodedMutations = Buffer.from(encodedMutations, 'base64').toString('utf-8');
        requestedMutationsObj = JSON.parse(decodedMutations);
      } catch (err) {
        console.error('Mutation decode failed:', err);
      }
    }

    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(request);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    

    // ✅ Provide default fallbacks
    const enhancedParams = {
      tbl: 'user_manifest_',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('user_manifest_', searchParams, authData, '')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('user_manifest_', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, RowMutations);

      return Response.json({
        status: 'success',
        message: ' data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET  failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(Request) {
  try {
    let body;
    let isMultipart = false;

    const contentType = Request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await Request.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await Request.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(Request);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const FormAction = body.user_manifest__mosy_action;
    const user_manifest__uptoken_value = base64Decode(body.user_manifest__uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  billing_log inputs array ---// 
  const InputsArr = {

    "transaction_ref" : "?", 
    "trx_type" : "?", 
    "trx_time" : "?", 
    "trx_source" : "?", 
    "ref_id" : "?", 
    "site_id" : "?", 
    "message" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "site_name" : "?", 
    "user_id" : "?", 
    "user_name" : "?", 
    "running_balance" : "?", 
    "cr" : "?", 
    "dr" : "?", 

  };

  //--- End billing_log inputs array --//

  
  //--- Begin  billing_transactions inputs array ---// 
  const InputsArr = {

    "trx_id" : "?", 
    "trx_date" : "?", 
    "trx_month_year" : "?", 
    "trx_remark" : "?", 
    "amount" : "?", 
    "trx_type" : "?", 
    "business_id" : "?", 
    "client_id" : "?", 
    "admin_id" : "?", 
    "TransactionType" : "?", 
    "BusinessShortCode" : "?", 
    "BillRefNumber" : "?", 
    "InvoiceNumber" : "?", 
    "OrgAccountBalance" : "?", 
    "ThirdPartyTransID" : "?", 
    "MSISDN" : "?", 
    "FirstName" : "?", 
    "MiddleName" : "?", 
    "LastName" : "?", 
    "trx_msg" : "?", 
    "account_id" : "?", 
    "used_status" : "?", 
    "filter_date" : "?", 
    "flw_id" : "?", 
    "flag_state" : "?", 
    "reconciled" : "?", 
    "corrected_number" : "?", 
    "site_id" : "?", 
    "site_name" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End billing_transactions inputs array --//

  
  //--- Begin  clients inputs array ---// 
  const InputsArr = {

    "client_name" : "?", 
    "client_email" : "?", 
    "client_tel" : "?", 
    "client_location" : "?", 
    "client_photo" : "?", 
    "gender" : "?", 
    "date_registered" : "?", 
    "password" : "?", 
    "admin_id" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End clients inputs array --//

  
  //--- Begin  cloud_files inputs array ---// 
  const InputsArr = {

    "itemid" : "?", 
    "remark" : "?", 
    "photo" : "?", 
    "dateuploaded" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End cloud_files inputs array --//

  
  //--- Begin  companies inputs array ---// 
  const InputsArr = {

    "business_no" : "?", 
    "name" : "?", 
    "mobile" : "?", 
    "email" : "?", 
    "business_name" : "?", 
    "location" : "?", 
    "specialty" : "?", 
    "remark" : "?", 
    "logo" : "?", 
    "bank_name" : "?", 
    "account_no" : "?", 
    "pin_no" : "?", 
    "swort_code" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End companies inputs array --//

  
  //--- Begin  hive_billing_user_accounts inputs array ---// 
  const InputsArr = {

    "user_id" : "?", 
    "user_name" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "cr" : "?", 
    "dr" : "?", 
    "account_status" : "?", 
    "last_recharge" : "?", 
    "bill_as_at" : "?", 
    "remark" : "?", 
    "site_name" : "?", 
    "balance" : "?", 
    "plan_id" : "?", 
    "plan_name" : "?", 
    "plan_amount" : "?", 
    "expiry_date" : "?", 
    "plan_duration" : "?", 
    "billing_type" : "?", 

  };

  //--- End hive_billing_user_accounts inputs array --//

  
  //--- Begin  inventory inputs array ---// 
  const InputsArr = {

    "item_name" : "?", 
    "quantity" : "?", 
    "rate" : "?", 
    "tax" : "?", 
    "discount" : "?", 
    "date_created" : "?", 
    "item_remark" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End inventory inputs array --//

  
  //--- Begin  invoice_items inputs array ---// 
  const InputsArr = {

    "invoice_id" : "?", 
    "item_id" : "?", 
    "item_name" : "?", 
    "quantity" : "?", 
    "rate" : "?", 
    "tax" : "?", 
    "discount" : "?", 
    "date_created" : "?", 
    "account_context" : "?", 
    "account_name" : "?", 
    "item_key" : "?", 
    "stock_type" : "?", 
    "invoice_edit_key" : "?", 
    "selling_price" : "?", 
    "sale_state" : "?", 
    "remaining_qty" : "?", 
    "add_to_stock" : "?", 
    "item_remark" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End invoice_items inputs array --//

  
  //--- Begin  invoice_payments inputs array ---// 
  const InputsArr = {

    "invoice_id" : "?", 
    "date_paid" : "?", 
    "amount_paid" : "?", 
    "balance" : "?", 
    "ref_no" : "?", 
    "payment_mode" : "?", 
    "remark" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "invoice_no" : "?", 

  };

  //--- End invoice_payments inputs array --//

  
  //--- Begin  invoices inputs array ---// 
  const InputsArr = {

    "invoice_no" : "?", 
    "date_created" : "?", 
    "date_due" : "?", 
    "paid_status" : "?", 
    "created_by" : "?", 
    "name" : "?", 
    "invoice_stage" : "?", 
    "remark" : "?", 
    "client_id" : "?", 
    "paid_on" : "?", 
    "supplier_id" : "?", 
    "invoice_type" : "?", 
    "account_affect" : "?", 
    "inv_no_int" : "?", 
    "invoice_key" : "?", 
    "client_name" : "?", 
    "client_tel" : "?", 
    "client_email" : "?", 
    "invoice_amount" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "vendor_headers" : "?", 
    "client_headers" : "?", 
    "vendor_name" : "?", 
    "currency" : "?", 
    "discount" : "?", 
    "date_paid" : "?", 
    "ref_no" : "?", 
    "quotation" : "?", 
    "date_updated" : "?", 
    "folder" : "?", 
    "footnote" : "?", 

  };

  //--- End invoices inputs array --//

  
  //--- Begin  lead_followup inputs array ---// 
  const InputsArr = {

    "lead_id" : "?", 
    "followup_type" : "?", 
    "followup_date" : "?", 
    "status" : "?", 
    "remark" : "?", 
    "potential" : "?", 
    "stage" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End lead_followup inputs array --//

  
  //--- Begin  leads_list inputs array ---// 
  const InputsArr = {

    "name" : "?", 
    "tel" : "?", 
    "email" : "?", 
    "lead_date" : "?", 
    "source" : "?", 
    "campaign" : "?", 
    "cost" : "?", 
    "potential" : "?", 
    "stage" : "?", 
    "tag" : "?", 
    "remark" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End leads_list inputs array --//

  
  //--- Begin  message_templates inputs array ---// 
  const InputsArr = {

    "template_name" : "?", 
    "message_subject" : "?", 
    "message_template" : "?", 
    "template_code" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End message_templates inputs array --//

  
  //--- Begin  messaging inputs array ---// 
  const InputsArr = {

    "receiver_contacts" : "?", 
    "receiver_tel" : "?", 
    "receiver_email" : "?", 
    "reciver_names" : "?", 
    "message_type" : "?", 
    "site_id" : "?", 
    "group_name" : "?", 
    "message_date" : "?", 
    "sent_state" : "?", 
    "msg_read_state" : "?", 
    "subject" : "?", 
    "message_label" : "?", 
    "message_details" : "?", 
    "sms_cost" : "?", 
    "page_count" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "custom_dictionary" : "?", 
    "message_signature" : "?", 
    "ref_number" : "?", 

  };

  //--- End messaging inputs array --//

  
  //--- Begin  mosy_sql_roll_back inputs array ---// 
  const InputsArr = {

    "table_name" : "?", 
    "roll_type" : "?", 
    "where_str" : "?", 
    "roll_timestamp" : "?", 
    "value_entries" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End mosy_sql_roll_back inputs array --//

  
  //--- Begin  page_manifest_ inputs array ---// 
  const InputsArr = {

    "page_group" : "?", 
    "site_id" : "?", 
    "page_url" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End page_manifest_ inputs array --//

  
  //--- Begin  quick_notes inputs array ---// 
  const InputsArr = {

    "note_title" : "?", 
    "note_date" : "?", 
    "note_details" : "?", 
    "note_tag" : "?", 
    "folder_name" : "?", 
    "dateupdated" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End quick_notes inputs array --//

  
  //--- Begin  sales_script inputs array ---// 
  const InputsArr = {

    "title" : "?", 
    "tag" : "?", 
    "event" : "?", 
    "reply_rate" : "?", 
    "message" : "?", 
    "lead_reply" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End sales_script inputs array --//

  
  //--- Begin  system_users inputs array ---// 
  const InputsArr = {

    "user_id" : "?", 
    "name" : "?", 
    "email" : "?", 
    "tel" : "?", 
    "ref_id" : "?", 
    "regdate" : "?", 
    "user_no" : "?", 
    "user_pic" : "?", 
    "user_gender" : "?", 
    "last_seen" : "?", 
    "about" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "auth_token" : "?", 
    "token_status" : "?", 
    "token_expiring_in" : "?", 

  };

  //--- End system_users inputs array --//

  
  //--- Begin  transactions inputs array ---// 
  const InputsArr = {

    "trx_id" : "?", 
    "trx_date" : "?", 
    "trx_month_year" : "?", 
    "trx_remark" : "?", 
    "amount" : "?", 
    "trx_type" : "?", 
    "business_id" : "?", 
    "client_id" : "?", 
    "admin_id" : "?", 
    "TransactionType" : "?", 
    "BusinessShortCode" : "?", 
    "BillRefNumber" : "?", 
    "InvoiceNumber" : "?", 
    "OrgAccountBalance" : "?", 
    "ThirdPartyTransID" : "?", 
    "MSISDN" : "?", 
    "FirstName" : "?", 
    "MiddleName" : "?", 
    "LastName" : "?", 
    "trx_msg" : "?", 
    "account_id" : "?", 
    "used_status" : "?", 
    "filter_date" : "?", 
    "flw_id" : "?", 
    "flag_state" : "?", 
    "reconciled" : "?", 
    "corrected_number" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "site_name" : "?", 

  };

  //--- End transactions inputs array --//

  
  //--- Begin  user_manifest_ inputs array ---// 
  const InputsArr = {

    "user_id" : "?", 
    "user_name" : "?", 
    "role_id" : "?", 
    "site_id" : "?", 
    "role_name" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End user_manifest_ inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('user_manifest_',InputsArr, Request, newId, authData)

    if (FormAction === "add_user_manifest_") 
    {
      
      mutatedDataArray. = newId;
      
      // Insert into table 
      const result = await Add(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        user_manifest__uptoken: result.record_id
      });
      
    }
    
    if (FormAction === "update_user_manifest_") {
      
      // update table 
      const result = await Update(newId, mutatedDataArray, body, authData, `='${user_manifest__uptoken_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        user_manifest__uptoken: user_manifest__uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${FormAction}`
    }, { status: 400 });

  } catch (err) {
    console.error(`Request failed:`, err);
    return Response.json(
      { status: 'error', 
      message: `Data Post error ${err.message}` },
      { status: 500 }
    );
  }
}