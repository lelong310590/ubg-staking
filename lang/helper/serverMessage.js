const fs = require('fs');

const obj = {
    "CANNOT_FIND_EXCHANGE_RATE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_ADDRESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_COIN": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "COIN_MUST_EXIST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "OUT_OF_AVAILABLE_WALLETS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_NUMBER_OF_INTERNAL_ADDRESS_WALLETS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PARTNER_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PARTNER_STATUS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_IDENTITY": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PARTNER_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "VALUE_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_VALUE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PARTNER_STATUS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_IDENTITY": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PARTNER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_IDENTITY": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_HASH": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "MUST_HAVE_EDIT_RATE_PERMISSION": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_COIN_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_EDIT_ETH_RATE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_TRANSACTION_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_TRANSACTION": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "NUMBER_OF_ITEMS_PER_PAGE_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_TRANSACTION_REQUEST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "FROZEN_ACCOUNT_CANNOT_TRANSFER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PIN_CODE_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PIN_CODE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ANOTHER_TRANSACTION_REQUEST_IS_PENDING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_COIN_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_FEE_COIN_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "RECEIVER_EMAIL_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "RECEIVER_IS_NOT_EXIST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_VALUE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "TOO_LONG_DESCRIPTION_LENGTH": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "FROZEN_ACCOUNT_CANNOT_WITHDRAW": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ANOTHER_TRANSACTION_REQUEST_IS_PENDING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EXTERNAL_WALLET_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "UNSUPPORTED_WITHDRAW_FEE_COIN": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_VALUE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_COIN_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_FEE_COIN_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "UNSUPPORT_PAY_FEE_WITH_ANOTHER_COIN": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_CODE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "KYC_HAVE_NOT_BEEN_UPLOADED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "KYC_MUST_BE_PENDING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "KYC_HAVE_NOT_BEEN_UPLOADED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "KYC_MUST_BE_PENDING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "MUST_UPLOAD_FULL_KYC": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ONLY_EMAIL_VERIFIED_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "KYC_EXISTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PAGE_SIZE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_OFFSET": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_NOTIFICATION_IDS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_ORDER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "UNSUPPORTED_TYPE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PAGE_SIZE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PAGE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_SYMBOL": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "WAITING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ACTIVE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "LEFT": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "RIGHT": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PENDING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "APPROVED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "REJECTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "REFRESH_BALANCE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "NEW_TRANSACTION": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "OPEN": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PARTIALLY_FILLED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "FILLED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANCELED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EXPIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "LIMIT": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "MARKET": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "BUY": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "SELL": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "NOT_READY": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "SUCCESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "FAIL": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PROCESSING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "SUCCESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DUPLICATE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CALL_LATER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "UNEXPECTED_ERROR": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "JUST_CREATED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ACCEPTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "REJECTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DISABLED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PAY_FOR_MINER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CALCULATE_SYSTEM_INDEX": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PAY_SYSTEM_COMMISSION": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PAY_RANK_COMMISSION": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "UPDATE_INVESTMENT_STATUS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "HOUR": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DATE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "MONTH": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "JUST_CREATED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "SUCCESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "FAILED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "created": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "value": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "email": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "type": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "KYC_REVIEW": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DISABLE_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ENABLE_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EDIT_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "VIEW_USERS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EDIT_RATE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "VIEW_TRANSACTIONS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "UPDATE_PERMISSION": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "VIEW_WITHDRAW_PROGRESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "REVIEW_WITHDRAW": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CHANGE_SERVER_CONFIG": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "VIEW_REPORT": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ENABLE_PARTNER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DISABLE_PARTNER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "JUST_REGISTERED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EMAIL_VERIFIED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "KYC_CONFIRMED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DISABLED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INTERNATIONAL": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DOMESTIC": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "JUST_CREATED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ACCEPTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "START_SEND_REQUEST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "WAIT_FOR_MINED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "SUCCESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "FAILED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "REJECTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "JUST_CREATED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "SUCCESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "REJECTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PROCESSING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ACCEPTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "START_SEND_REQUEST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "WAIT_FOR_MINED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "FAILED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ROOT_USER_ID_IS_INVALID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "ROOT_USER_MUST_BELONG_TO_CURRENT_USER_SYSTEM": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "NUMBER_OF_LEVELS_FROM_ROOT_MUST_BE_POSITIVE_INTEGER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "NUMBER_OF_LEVELS_IS_OUT_OF_RANGE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_ROOT_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INCORRECT_CURRENT_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PASSWORD_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "OLD_PIN_CODE_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "NEW_PIN_CODE_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PIN_CODE_FORMAT": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_OLD_PIN_CODE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EMAIL_EXISTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_EMAIL": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_FIRST_NAME": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_LAST_NAME": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_PRESENTER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_RESET_PASSWORD_CODE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "RESET_PASSWORD_CODE_EXPIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_EMAIL": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PENDING": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANCELLED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "SUCCESS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EXPIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CURRENT_PASSWORD_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_CURRENT_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "TARGETED_USER_HAS_NOT_CONFIRMED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_NUMBER_OF_ITEMS_PER_PAGE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PAGE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_STATUS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_COIN_ID": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EMAIL_DOES_NOT_EXIST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "DISABLED_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_TOKEN": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_USER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_USER_STATUS": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "EMAIL_EXISTED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_EMAIL": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_FIRST_NAME": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_LAST_NAME": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_PRESENTER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "AFFILIATION_CODE_MUST_EXIST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PHONE_NUMBER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "COUNTRY_MUST_EXIST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "CANNOT_FIND_VERIFICATION_CODE": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "REGISTER_CODE_EXPIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PIN_CODE_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PASSWORD_IS_REQUIRED": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PIN_CODE_FORMAT": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "PIN_CODE_HAVE_BEEN_SET_ALREADY": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PASSWORD": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_FIRST_NAME": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_LAST_NAME": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "INVALID_PHONE_NUMBER": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
    "COUNTRY_MUST_EXIST": {
        "en_US": "",
        "vi_VN": "",
        "ja_JP": "",
        "th_TH": "",
        "id_ID": "",
        "ms_MY": "",
        "zh_CN": ""
    },
}

let temp = {}

console.info(Object.keys(obj).reduce((output, key) => {
    if (temp[key]) return output;
    else temp[key] = obj[key];
    return output;
}, {}))

fs.writeFile((`./temp.json`), JSON.stringify(temp, null, 4), function (err) {
    if (err) console.error(err)

    console.info('••••• Fetch dictionary successful.')
});