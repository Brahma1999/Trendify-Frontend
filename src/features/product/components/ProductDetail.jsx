
import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// import { useAlert } from 'react-alert';
import { Grid } from 'react-loader-spinner';
import {
    fetchProductByIdAsync,
    selectProductById,
    selectProductListStatus,
} from '../productSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { AddToCartAsync, selectedItems } from '../../cart/cartSlice'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const colors = [
    { name: 'white', class: "bg-white", selectedClss: "ring-gray-400" },
    { name: 'Gray', class: "bg-gray-200", selectedClss: "ring-gray-400" },
    { name: 'Black', class: "bg-gray-900", selectedClss: "ring-gray-900" },

]
const sizes = [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: true },
]



export default function ProductDetail() {


    const dispatch = useDispatch();
    const params = useParams();
    // const alert = useAlert();
    const status = useSelector(selectProductListStatus);
    // Get the product using the selector
    const items = useSelector(selectedItems);
    const product = useSelector((state) => selectProductById(state, params.id));
    // Initialize state variables only after product is defined
    const [selectedColor, setSelectedColor] = useState(colors[0] || '');
    const [selectedSize, setSelectedSize] = useState(sizes[2] || '');

    const user = useSelector(selectLoggedInUser);
    const [isInCart, setIsInCart] = useState(false);

    const handleCart = (e) => {
        e.preventDefault();
        const productIndex = items.findIndex(item => item.productId === product.id);
        if (productIndex < 0) {
            const newItem = { ...product, quantity: 1, productId: product.id, user: user.id };
            delete newItem.id;
            dispatch(AddToCartAsync(newItem)); // Passing newItem directly, with 'id'
        } else {
            setIsInCart(true);
        }
    };

    useEffect(() => {
        dispatch(fetchProductByIdAsync(params.id));
    }, [dispatch, params.id]);

    return (
        <div className="bg-white">
            {status === 'loading' ? (
                <Grid
                    height="80"
                    width="80"
                    color="rgb(79, 70, 229) "
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            ) : null}
            {product && (
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            {product.breadcrumbs &&
                                product.breadcrumbs.map((breadcrumb) => (
                                    <li key={breadcrumb.id}>
                                        <div className="flex items-center">
                                            <a
                                                href={breadcrumb.href}
                                                className="mr-2 text-sm font-medium text-gray-900"
                                            >
                                                {breadcrumb.name}
                                            </a>
                                            <svg
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="h-5 w-4 text-gray-300"
                                            >
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                ))}
                            <li className="text-sm">
                                <a
                                    href={product.href}
                                    aria-current="page"
                                    className="font-medium text-gray-500 hover:text-gray-600"
                                >
                                    {product.title}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                            {/* Image Section */}
                            <div className="lg:col-span-1">
                                <div className="aspect-w-3 aspect-h-3 overflow-hidden rounded-lg">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.images}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>

                            {/* Product Info Section */}
                            <div className="lg:col-span-1">
                                <div className="mx-auto max-w-2xl pb-0 pt-0 lg:max-w-none lg:pb-24 lg:pt-0">
                                    <div className="lg:border-r lg:border-gray-200 lg:pr-8">
                                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                            {product.title}
                                        </h1>
                                    </div>

                                    {/* Options */}
                                    <div className="mt-4 lg:mt-0">
                                        <h2 className="sr-only">Product information</h2>
                                        <p className="text-xl line-through tracking-tight text-gray-500">
                                            ${Math.round(product.price)}

                                        </p>
                                        <p className="text-3xl tracking-tight text-gray-800">
                                            $
                                            {Math.round(
                                                product.price *
                                                (1 - product.discountPercentage / 100)
                                            )}
                                        </p>

                                        {/* Reviews */}
                                        <div className="mt-6">
                                            <h3 className="sr-only">Reviews</h3>
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                product.rating > rating
                                                                    ? 'text-gray-900'
                                                                    : 'text-gray-200',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="sr-only">{product.rating} out of 5 stars</p>
                                            </div>
                                        </div>

                                        <form className="mt-5">
                                            {/* Colors */}
                                            {/* {product.colors && product.colors.length > 0 && (
                                                
                                            )} */}
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                                <RadioGroup
                                                    value={selectedColor}
                                                    onChange={setSelectedColor}
                                                    className="mt-4"
                                                >
                                                    <RadioGroup.Label className="sr-only">
                                                        Choose a color
                                                    </RadioGroup.Label>
                                                    <div className="flex items-center space-x-3">
                                                        {colors.map((color) => (
                                                            <RadioGroup.Option
                                                                key={color.name}
                                                                value={color}
                                                                className={({ active, checked }) =>
                                                                    classNames(
                                                                        color.selectedClass,
                                                                        active && checked ? 'ring ring-offset-1' : '',
                                                                        !active && checked ? 'ring-2' : '',
                                                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                                    )
                                                                }
                                                            >
                                                                <RadioGroup.Label as="span" className="sr-only">
                                                                    {color.name}
                                                                </RadioGroup.Label>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        color.class,
                                                                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                                    )}
                                                                />
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            {/* Sizes */}
                                            {/* {product.sizes && product.sizes.length > 0 && (
                                                
                                            )} */}
                                            <div className="mt-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        Size
                                                    </h3>
                                                    <p

                                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Size guide
                                                    </p>
                                                </div>

                                                <RadioGroup
                                                    value={selectedSize}
                                                    onChange={setSelectedSize}
                                                    className="mt-2"
                                                >
                                                    <RadioGroup.Label className="sr-only">
                                                        Choose a size
                                                    </RadioGroup.Label>
                                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                        {sizes.map((size) => (
                                                            <RadioGroup.Option
                                                                key={size.name}
                                                                value={size}
                                                                disabled={!size.inStock}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        size.inStock
                                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                        active ? 'ring-2 ring-indigo-500' : '',
                                                                        'group relative flex items-center justify-center rounded-md border py-2 px-3 text-xs font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-4' // Adjusted padding and font size
                                                                    )
                                                                }
                                                            >
                                                                {({ active, checked }) => (
                                                                    <>
                                                                        <RadioGroup.Label as="span">
                                                                            {size.name}
                                                                        </RadioGroup.Label>
                                                                        {size.inStock ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'border' : 'border-2',
                                                                                    checked
                                                                                        ? 'border-indigo-500'
                                                                                        : 'border-transparent',
                                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                            >
                                                                                <svg
                                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                    viewBox="0 0 100 100"
                                                                                    preserveAspectRatio="none"
                                                                                    stroke="currentColor"
                                                                                >
                                                                                    <line
                                                                                        x1={0}
                                                                                        y1={100}
                                                                                        x2={100}
                                                                                        y2={0}
                                                                                        vectorEffect="non-scaling-stroke"
                                                                                    />
                                                                                </svg>
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            {product.stock !== 0 &&
                                                <button
                                                    onClick={handleCart}
                                                    type="submit"
                                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    {isInCart ? "Already Added" : "Add to Cart"}
                                                </button>}
                                        </form>
                                    </div>

                                    <div className="py-10 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                        {/* Description and details */}
                                        <div>
                                            <h3 className="sr-only">Description</h3>

                                            <div className="space-y-6">
                                                <p className="text-base text-gray-900">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>

                                        {product.highlights && (
                                            <div className="mt-10">
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    Highlights
                                                </h3>

                                                <div className="mt-4">
                                                    <ul

                                                        className="list-disc space-y-2 pl-4 text-sm"
                                                    >
                                                        {product.highlights.map((highlight) => (
                                                            <li key={highlight} className="text-gray-400">
                                                                <span className="text-gray-600">{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            )}
        </div>
    );
}
