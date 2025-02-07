import { Request, Response } from 'express'
import { CreateCodigo, Embarque } from '@/types/embarques'
import { newEmbarque, createEmbarqueProduct, delEmbarque, getEmbarqueProducts, getOrdenesStatic, listEmbarques, getEmbarqueById, updtEmbarque, deleteProductFromEmbarque, createNewEmbarqueContenedor, getContenedoresByEmbarque, changeStateToEmbarque, deleteContainerInEmbarque, updateContainerInEmbarque, getProductsInOrdenCompra, postNewDestino, getDestinosPorEmbarque, deleteDestino, generateContenedorCode, getCodigosContenedores, getEmbarqueData, verifyContainers, getVerificationsContainer, editDestino, getEmbarquesPagination } from '@/utils/embarques';

export const getEmbarques = async (req: Request, res: Response) => {

    try {
        const ordenes = await listEmbarques();
        res.status(200).json(ordenes)
    } catch (error: any) {
        res.status(500).json(error)
    }
}

export const getEmbarquesPaging = async (req: Request, res: Response) => {
    try {
        const { page, pageSize, search, estatusFiltersStr, createdAtFilterString, deliveryDateFilterString } = req.query;
        const estatusFilters = estatusFiltersStr ? (estatusFiltersStr as string).split(',') : [];
        const createdAtFilter = createdAtFilterString ? (createdAtFilterString as string).split(',') : null;
        const deliveryDateFilter = deliveryDateFilterString ? (deliveryDateFilterString as string).split(',') : null;

        const embarques = await getEmbarquesPagination(
            parseInt(page as string),
            parseInt(pageSize as string),
            search as string,
            estatusFilters as string[],
            createdAtFilter as any[],
            deliveryDateFilter as any[]
          );

          res.status(200).json(embarques)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const showEmbarqueById = async (req: Request, res: Response) => {
    try {
        const embarque_id = req.params.id;
        const embarque = await getEmbarqueById(parseInt(embarque_id))

        res.status(200).json(embarque)

    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteEmbarque = async (req: Request, res: Response) => {
    try {
        const embarque_id = req.params.id
        const embarqueDeleted = await delEmbarque(parseInt(embarque_id))

        res.status(200).json({ embarqueDeleted })

    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateEmbarque = async (req: Request, res: Response) => {
    try {
        const embarque_data = req.body
        const embarque_id = req.params.id
        const updateEmbarque = await updtEmbarque(embarque_data, parseInt(embarque_id));

        res.status(200).json(updateEmbarque)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createEmbarque = async (req: Request, res: Response) => {
    try {
        const embarque_data = req.body;
        const nuevoEmbarque = await newEmbarque(embarque_data);

        res.status(200).json({ nuevoEmbarque })

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getOrdenes = async (req: Request, res: Response) => {
    try {
        const ordenes = await getOrdenesStatic();

        res.status(200).json(ordenes)
    } catch (error: any) {
        res.status(500).json(error)
    }
}

export const newEmbarqueProduct = async (req: Request, res: Response) => {
    try {
        const newEmbarqueProducto = await createEmbarqueProduct(req.body);

        res.status(200).json({newEmbarqueProducto})
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const indexEmbarqueProduct = async (req: Request, res: Response) => {
    try {
        const embarque_id = req.params.embarque_id;
        const embarque = await getEmbarqueProducts(parseInt(embarque_id))

        res.status(200).json(embarque)

    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteProductEmbarque = async (req: Request, res: Response) => {
    try {
        const contenedor_productos_id = req.params.contenedor_productos_id;
        const contenedor_id = req.body.contenedor_id;
        const cantidad = req.body.cantidad;
        const embarqueDeleted = await deleteProductFromEmbarque(parseInt(contenedor_productos_id), parseInt(contenedor_id), parseInt(cantidad))

        res.status(200).json({ embarqueDeleted })
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export const createEmbarqueContenedores = async (req:Request, res: Response) => {
    try {
        const contenedor_data = req.body
        const embarque_id = req.params.embarque_id
        const newEmbarque = await createNewEmbarqueContenedor(contenedor_data, parseInt(embarque_id));

        res.status(200).json(newEmbarque)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getEmbarqueContenedores = async (req: Request, res: Response) => {
    try {
        const embarque_id = req.params.embarque_id
        const contenedoresByEmbarque = await getContenedoresByEmbarque(parseInt(embarque_id))

        res.status(200).json(contenedoresByEmbarque)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const EditEstadoEmbarque = async(req:Request, res:Response) => {
    try {
        
        const embarque_id = req.params.embarque_id
        const estado = req.body.estado
        const order_id = req.body.order_id
        const statusChanged = await changeStateToEmbarque(parseInt(embarque_id), estado, parseInt(order_id))

        res.status(200).json(statusChanged)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getContenedoresEmbarque = async ( req: Request, res: Response) => {
    try {
        
        const embarque_id = req.params.embarque_id
        const data = await getContenedoresByEmbarque(parseInt(embarque_id))

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteContenedorEmbarque = async (req:Request, res:Response) => {
    try {
        const contenedor_id = req.params.contenedor_id;
        const data = await deleteContainerInEmbarque(parseInt(contenedor_id));

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateContenedorEmbarque = async (req:Request, res:Response) => {
    try {
        const payload = req.body;
        const contenedor_id = req.params.contenedor_id;

        const data = await updateContainerInEmbarque(parseInt(contenedor_id), payload);
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getProductosInOrderByEmbarque = async(req:Request, res: Response) => {
    try {
        
        const order_id = req.params.order_id;
        const data = await getProductsInOrdenCompra(parseInt(order_id));

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json(error)
    }
}

export const postDestinos = async(req:Request, res: Response) => {
    try {
        const payload = req.body;

        const data = await postNewDestino(payload);

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json(error)
    }
}

export const putDestino = async(req:Request, res: Response) => {
    try {
        const payload = req.body;
        const destino_id = req.params.destino_id;

        const data = await editDestino(parseInt(destino_id), payload);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }

}

export const getDestinoEmbarque = async (req:Request, res: Response) =>{
    try {
        const embarque_id = req.params.embarque_id;
        const data = await getDestinosPorEmbarque(parseInt(embarque_id));

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteDestinoEmbarque = async (req:Request, res: Response) =>{
    try {

        const destino_id = req.params.destino_id;
        const data = await deleteDestino(parseInt(destino_id));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createCodigoContenedor = async(req: Request, res: Response) => {
    try {
        console.log(req.body)
        const payload = req.body;
        console.log(payload)
        const data = await generateContenedorCode(payload);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllEmbarqueContenedorCodigo = async (req: Request, res: Response) => {
    try {
        const embarque_id = req.params.embarque_id;
        const data = await getCodigosContenedores(parseInt(embarque_id));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllDataFromEmbarque = async (req: Request, res: Response) => {
    try {
        const embarque_id = req.params.embarque_id;
        const embarque = await getEmbarqueData(parseInt(embarque_id));

        console.log(embarque)
        
        res.status(200).json(embarque);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const verifyContainersEmbarque = async (req: Request, res: Response) => {
    try {
        const { embarque_id, piezas_verificadas } = req.body;
        const Result = await verifyContainers(parseInt(embarque_id), piezas_verificadas);
        return res.status(200).json({ message: 'Productos verificados' });
    } catch (error: any) {
        console.log('entra error');
        console.log({ error });
        res.status(500).json(error);
    }
};

export const getContainersVerified = async (req:Request, res: Response) => {
    try {
        
        const embarque_id = req.params.embarque_id
        const verificaciones = await getVerificationsContainer(parseInt(embarque_id))

        res.status(200).json(verificaciones)
    } catch (error) {
        res.status(500).json(error)
    }
}