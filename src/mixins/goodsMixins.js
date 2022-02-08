export default {
  data() {
    return {
      ruleForm: {
        productName: "",
        defaultPrice: "",
        hotLabel: "",
        introduction: "",
        mainCategory: "m-makeup",
        productCode: "",
        imgUrl: "",
        
      },
      // imgUrl: "",
      goodsId: "",
      buttonStatus:true,//按钮状态，0为不可点击
      rules: {
        productName: [{
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
          {
            min: 2,
            message: "请至少输入2个字符",
            trigger: "blur",
          },
        ],
        defaultPrice: [{
          required: true,
          message: "请填写商品价格",
          trigger: "blur",
        }, ],
        mainCategory: [{
          required: true,
          message: "请选择商品分类",
          trigger: "blur",
        }, ],
        // getCode: [
        //   {
        //     required: false,
        //     message: "请生成当前商品的产品号",
        //     trigger: "blur",
        //   },
        // ],
      },
      category: [{
          text: "彩妆",
          type: "m-makeup",
        },
        {
          text: "护肤",
          type: "m-skincare",
        },
        {
          text: "香水",
          type: "m-fragrance",
        },
        {
          text: "其他",
          type: "m-others",
        },
      ],
      hotLabels: [{
          text: "热卖",
          id: 1,
        },
        {
          text: "新品",
          id: 2,
        },
        {
          text: "NEW",
          id: 3,
        },
        {
          text: "HOT",
          id: 4,
        },
      ],
    };
  },

  methods: {
    //当上传的图片发生改变的触发的钩子
    onChange(file, fileList) {
      console.log('mixins.file', file);
      // 处理图片是否能显示在页面上
      this.ruleForm.imgUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 上传新增商品信息
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //获取商品id
          const {
            data
          } = await this.$request.post("/product", this.ruleForm);
          this.goodsId = data.data.insertedId;
          // 获取到商品id再把id和图片信息一同发送到接口
          this.$refs.uploadImg.submit();
          if (data.code == 200) {
            this.$alert("添加成功", "提示", {
              type: "success",
              confirmButtonText: '确定',
            })
            this.resetForm()
          }

        }
      });
    },

    //上传图片
    async uploadImg(fileInfo) {
      console.log('fileInfo', fileInfo);
      // 把请求参数设置为formdata对象
      const fData = new FormData();
      // 携带图片的file信息（⭐set的参数，需要跟接口的upload.single('productImg')一致）
      fData.set("productImg", fileInfo.file);
      //接口要求传id
      fData.set("productId", this.goodsId);
      const result = await this.$request.put("/upload/productImg", fData);


    },
    //获取产品号
    async getCode() {
      let categoryCode = this.categoryCode();
      categoryCode = categoryCode[this.ruleForm.mainCategory];
      const {
        data
      } = await this.$request.post("/product/getcode", {
        categoryCode,
      });
      this.ruleForm.productCode = data.data.newProductCode;
      console.log('productCode', this.ruleForm.productCode);
    },
    // 格式化分类代号
    categoryCode() {
      let categoryCode = {
        "m-makeup": "MK",
        "m-skincare": "SC",
        "m-fragrance": "FR",
        "m-others": "OS",
      };
      return categoryCode;
    },
    //当分类改变时，触发的钩子
    //⭐由于watch监听，只要数据一变化就会触发，所以不采用。
    changeCate(newVal) {
      console.log('isNewval',newVal);
      if (newVal) {
        this.$alert("您修改了分类，需要重新生成产品号", "提示", {
          type: "warning",
          confirmButtonText: "确定",
        });
        this.ruleForm.productCode = '';
        //修改按钮状态
        this.buttonStatus=false;
      }
    },
    //点击重置后，清空表单
    resetForm() {
      this.ruleForm = {
        productName: "",
        defaultPrice: "",
        hotLabel: "",
        introduction: "",
        mainCategory: "m-makeup",
        productCode: "",
      }
    },
    // 清空表单
  },
 

 
  
}