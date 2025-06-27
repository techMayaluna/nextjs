import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Insurance from '@/models/insurances';

export async function PUT(request) {
  try {
    const { id, fechaVencimiento } = await request.json();

    if (!id || !fechaVencimiento) {
      return NextResponse.json(
        { message: 'ID y fecha de vencimiento son requeridos' },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedInsurance = await Insurance.findByIdAndUpdate(
      id,
      { fechaVencimientoExtintor: new Date(fechaVencimiento) },
      { new: true }
    );

    if (!updatedInsurance) {
      return NextResponse.json(
        { message: 'Seguro no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedInsurance,
    });
  } catch (error) {
    console.error('Error al actualizar la fecha del extintor:', error);
    return NextResponse.json(
      { message: 'Error al actualizar la fecha del extintor', error: error.message },
      { status: 500 }
    );
  }
}
