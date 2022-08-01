// import User from "./../model/user";

const { Product, Category, Career } = require('./../model');
const { updatedHandler, errHandler, successHandler } = require('../response');
const { filterData, filterCaregories, handleCheckChildren } = require('../common/helper');

const slugify = require('slugify');

const puppeteer = require('puppeteer');

const createProduct = async (req, res) => {
	try {
		const obj = {
			name: req.body.name.toString(),
			price: Number(req.body.price),
			slug: slugify(req.body.name),
			categories: req.body.categories,
			type: req.body.type,
		};

		if (req.body.parentId) {
			obj.parentId = req.body.parentId;
		}

		let product = await Product.findOne({
			name: req.body.name,
		});

		if (product) return errHandler(product, res);

		const _product = new Product(obj);

		await _product.save();

		return successHandler('', res);
	} catch (err) {
		console.log('createProduct error', err);
		return errHandler(err, res);
	}
};

const editProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const obj = {
			name: req.body.name,
			price: req.body.price,
			type: req.body.type,
			categories: req.body.categories,
		};

		if (req.body.parentId) {
			obj.parentId = req.body.parentId;
		}

		const product = await Product.updateOne(
			{
				_id: id,
			},
			obj,
			{ new: true }
		);

		return updatedHandler(product, res);
	} catch (err) {
		console.log('editProduct error');
		return errHandler(err, res);
	}
};

const fetchProduct = async (req, res) => {
	try {
		let _product = await Product.find({}).populate('categories', 'name').populate('parentId', 'name');
		let newData = filterData(_product);
		let lastData = filterCaregories(newData);
		return successHandler(lastData, res);
	} catch (err) {
		console.log('fetchProduct error');
		return errHandler(err, res);
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id, req);
		// return;
		await Product.findOneAndDelete({
			_id: id,
		});

		return res.status(200).json({ message: 'Xóa sản phẩm thành công', status: 200 });
	} catch (err) {
		console.log('deleteProduct error');
		return errHandler(err, res);
	}
};

const getProductBySlug = async (req, res) => {
	try {
		let _cate = await Category.findOne({ slug: req.params.slug });

		let _product = await Product.find({
			categories: {
				$in: [_cate._id],
			},
		}).populate('categories');

		let newData = filterData(_product);

		let lastData = filterCaregories(newData);

		return successHandler(lastData, res, _cate);
	} catch (err) {
		console.log('getProductBySlug error');

		return errHandler(err, res);
	}
};

const demoPuppeteer = async (req, res) => {
	try {
		let query = req.body.q;
		let text = await mstHeadlessBrowser(query);
		console.log(text);
		return successHandler(text, res);
	} catch (err) {
		console.log('puppeteer error', err);
		return errHandler(err, res);
	}
};

const mstHeadlessBrowser = async (params) => {
	const browser = await puppeteer.launch();

	const page = await browser.newPage();

	const inputSearch = 'input[name=q]';

	await page.goto('https://masothue.com/', { waitUntil: 'networkidle2' });

	await page.waitForSelector(inputSearch);
	console.log('anchor', params);

	await page.$eval(inputSearch, (el, v) => (el.value = v), params);
	// await page.screenshot({ path: `uploads/puppeteer/input.png`, fullPage: true });
	await page.click('button[type="submit"]');

	await page.waitForNavigation({ waitUntil: 'networkidle2' });

	// await page.screenshot({ path: `uploads/puppeteer/loading.png`, fullPage: true });

	const text = await page.evaluate(async () => {
		const anchor = document.querySelector('#main section .container');

		if (anchor) {
			return anchor?.textContent || anchor?.textContent || anchor?.innerText || anchor;
		}

		return 'Objective not found';
	});

	// await page.screenshot({ path: `uploads/puppeteer/result.png`, fullPage: true });

	await browser.close();

	return text;
};

module.exports = {
	createProduct,
	editProduct,
	fetchProduct,
	deleteProduct,
	getProductBySlug,
	demoPuppeteer,
};
