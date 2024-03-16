import { NextResponse } from 'next/server'
import { Contact } from './../models/Contact'
import connect from '@/utils/db'

const getMails = async () => {
    try {
      await connect();
    const mails = await Contact.find()
      .sort({ createdAt: 'desc' })
      .exec();

      return new NextResponse(JSON.stringify(mails), { status: 200 })
  } catch (err: any) {
    console.error('Error at getMails() while fetching mails: ', err);
    return [];
  }
};

export default getMails;
