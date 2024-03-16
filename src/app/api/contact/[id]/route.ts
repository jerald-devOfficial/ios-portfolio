import { Contact } from "@/models/Contact"
import connect from "@/utils/db"
import { NextResponse } from "next/server"


interface IParams {
    id: string;
  }

export const PATCH = async (
    request: Request,
    { params }: { params: IParams }
  ) => {
    try {
      await connect()
      const { id } = params;
  
      const updatedMail = await Contact.findByIdAndUpdate(id, { read: true }, { new: true });
  
      return new NextResponse(JSON.stringify(updatedMail), { status: 200 })
    } catch (err) {
        console.log('Error while processing PATCH request: ', err);
        console.error(
            'Error happened while doing PATCH for /api/contact/[id] at route.ts: ',
            err
          );
      return new NextResponse('Database Error', { status: 500 })
    }
  }
  