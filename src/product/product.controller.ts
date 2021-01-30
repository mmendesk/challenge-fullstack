import {
    Controller,
    Post,
    Res,
    HttpStatus,
    Body,
    Get,
    Param,
    NotFoundException,
    Delete,
    Query,
    Put,
    UseGuards
} from '@nestjs/common';
import { ProductService } from "./product.service";

import { CreateProductDTO } from "./dto/product.dto";
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json(product);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDeleted = await this.productService.deleteProduct(productID)
        if (!productDeleted) throw new NotFoundException('Product does not exist!'); {
            return res.status(HttpStatus.OK).json({
                message: 'Product Deleted Succesfully',
                productDeleted
            })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO)
        if (!updatedProduct) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfuly',
            updatedProduct
        })
    }

}