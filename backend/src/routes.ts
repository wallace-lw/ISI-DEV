import type { FastifyPluginAsync } from "fastify";
import {
  ApplyCouponDiscountController,
  ApplyPercentDiscountController,
  CreateCouponController,
  CreateProductController,
  DeleteCouponController,
  DeleteProductController,
  GetCouponController,
  GetProductController,
  ListCouponsController,
  ListProductsController,
  RemoveDiscountController,
  RestoreProductController,
  UpdateCouponController,
  UpdateProductController,
} from "./controllers";
import { CouponRepositoryImpl, ProductRepositoryImpl } from "./repositories";
import {
  ApplyCouponDiscountService,
  ApplyPercentDiscountService,
  CreateCouponService,
  CreateProductService,
  DeleteCouponService,
  DeleteProductService,
  GetCouponService,
  GetProductService,
  ListCouponsService,
  ListProductsService,
  RemoveDiscountService,
  RestoreProductService,
  UpdateCouponService,
  UpdateProductService,
} from "./services";

const productRepository = new ProductRepositoryImpl();
const couponRepository = new CouponRepositoryImpl();

// Instanciação de serviços
const createProductSerivce = new CreateProductService(productRepository);
const listProductsService = new ListProductsService(productRepository);
const getProductService = new GetProductService(productRepository);
const updateProductService = new UpdateProductService(productRepository);
const deleteProductService = new DeleteProductService(productRepository);
const restoreProductService = new RestoreProductService(productRepository);
const applyPercentDiscountService = new ApplyPercentDiscountService(
	productRepository,
);
const applyCouponDiscountService = new ApplyCouponDiscountService(
	productRepository,
	couponRepository,
);
const removeDiscountService = new RemoveDiscountService(productRepository);
const createCouponService = new CreateCouponService(couponRepository);
const listCouponsService = new ListCouponsService(couponRepository);
const getCouponService = new GetCouponService(couponRepository);
const updateCouponService = new UpdateCouponService(couponRepository);
const deleteCouponService = new DeleteCouponService(couponRepository);

// Instanciação de controllers
const createProduct = new CreateProductController(createProductSerivce);
const listProducts = new ListProductsController(listProductsService);
const getProduct = new GetProductController(getProductService);
const updateProduct = new UpdateProductController(updateProductService);
const deleteProduct = new DeleteProductController(deleteProductService);
const restoreProduct = new RestoreProductController(restoreProductService);
const applyPercentDiscount = new ApplyPercentDiscountController(
	applyPercentDiscountService,
);
const applyCouponDiscount = new ApplyCouponDiscountController(
	applyCouponDiscountService,
);
const removeDiscount = new RemoveDiscountController(removeDiscountService);
const createCoupon = new CreateCouponController(createCouponService);
const listCoupons = new ListCouponsController(listCouponsService);
const getCoupon = new GetCouponController(getCouponService);
const updateCoupon = new UpdateCouponController(updateCouponService);
const deleteCoupon = new DeleteCouponController(deleteCouponService);

const routes: FastifyPluginAsync = async (fastify) => {
	// Rotas de produtos
	fastify.post("/products", createProduct.execute.bind(createProduct));
	fastify.get("/products", listProducts.execute.bind(listProducts));
	fastify.get("/products/:id", getProduct.execute.bind(getProduct));
	fastify.patch("/products/:id", updateProduct.execute.bind(updateProduct));
	fastify.delete("/products/:id", deleteProduct.execute.bind(deleteProduct));
	fastify.post(
		"/products/:id/restore",
		restoreProduct.execute.bind(restoreProduct),
	);
	fastify.post(
		"/products/:id/discount/percent",
		applyPercentDiscount.execute.bind(applyPercentDiscount),
	);
	fastify.post(
		"/products/:id/discount/coupon",
		applyCouponDiscount.execute.bind(applyCouponDiscount),
	);
	fastify.delete(
		"/products/:id/discount",
		removeDiscount.execute.bind(removeDiscount),
	);

	// Rotas de cupons
	fastify.post("/coupons", createCoupon.execute.bind(createCoupon));
	fastify.get("/coupons", listCoupons.execute.bind(listCoupons));
	fastify.get("/coupons/:code", getCoupon.execute.bind(getCoupon));
	fastify.patch("/coupons/:code", updateCoupon.execute.bind(updateCoupon));
	fastify.delete("/coupons/:code", deleteCoupon.execute.bind(deleteCoupon));
};

export default routes;
