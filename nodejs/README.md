## 获取其他储存（例如mClassify）

---

##### 请求说明

> 

---

###### 接口地址

> admin/others/getOthersByName

###### 请求方法

> GET

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | name | 是 | string | 名字，获取mClassify就传mClassify |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>



## 更改其他储存（例如mClassify）

---

##### 请求说明

> 

---

###### 接口地址

> admin/others/changeOthersByName

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | name | 是 | string | 名字，更改mClassify就传mClassify |
> | content | 是 | string | 储存的内容 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>



## 药品出库

---

##### 请求说明

> 

---

###### 接口地址

> admin/drug/reduceDrugs

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | id | 是 | string | id |
> | mInPrice | 是 | string | 单价 |
> | inputer | 是 | string | 存入者 |
> | mBarcode | 是 | string | 条形码 |
> | mName | 是 | string | 药物名称 |
> | mark | 是 | string | 备注 |
> | type | 是 | string | in/out 传out |
> | mStock | 是 | string | 减少数目 |
> | user | 否 | string | 使用者 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>


## 药品更新

---

##### 请求说明

> 

---

###### 接口地址

> admin/drug/updateDrugInfo

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | id | 是 | string | id |
> | mType | 是 | string | 药品类型 |
> | mClassify | 是 | string | 归属分类 |
> | mUnit | 是 | string | 药品规格 |
> | mUseWay | 是 | string | 用药方式 |
> | mTreatment | 是 | string | 用药疗程 |
> | mBatch | 是 | string | 批号 |
> | mInPrice | 是 | string | 进货价 |
> | mOutPrice | 是 | string | 售价 |
> | mProduceTime | 是 | string | 生产日期 |
> | mOverdueTime | 是 | string | 最后有效日期 |
> | inputer | 是 | string | 存入者 |
> | factory | 否 | string | 药品厂商 |
> | mRemark | 否 | string | 备注 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>


## 药品查询

---

##### 请求说明

> 

---

###### 接口地址

> admin/drug/getDrugsInfo

###### 请求方法

> GET

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | params | 否 | string | 不传：获取全部数据，传数组字符串：比如要查id等于7同时barcode为1111的就传：[{"name":"id","word":"7"},{"name":"mBarcode","word":"1111"}]，详细字段看药品录入的传参 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>


## 药品录入

---

##### 请求说明

> 

---

###### 接口地址

> admin/drug/saveDrugsInfo

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | mBarcode | 是 | string | 条形码 |
> | mType | 是 | string | 药品类型 |
> | mName | 是 | string | 药品名称 |
> | mClassify | 是 | string | 归属分类 |
> | mUnit | 是 | string | 药品规格 |
> | mUseWay | 是 | string | 用药方式 |
> | mTreatment | 是 | string | 用药疗程 |
> | mBatch | 是 | string | 批号 |
> | mInPrice | 是 | string | 进货价 |
> | mOutPrice | 是 | string | 售价 |
> | mStock | 是 | Number | 库存量 |
> | type | 是 | string | in/out 传in |
> | mProduceTime | 是 | string | 生产日期 |
> | mOverdueTime | 是 | string | 最后有效日期 |
> | inputer | 是 | string | 存入者 |
> | factory | 否 | string | 药品厂商 |
> | mRemark | 否 | string | 备注 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | msg | String | 提示信息 |
>

## 后台获取各类型权限数组

---

##### 请求说明

> 获取权限数组字符串，仅限admin

---

###### 接口地址

> admin/auth/getAuthTable

###### 请求方法

> GET

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | type | 否 | string | 不传type：获取全部；传 '超级管理员' '校医' 'notNeedFilter'分别对应超为级管理员、校医、均不用过滤 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | msg | String | 提示信息 |
>

## 更改权限数组

---

##### 请求说明

> 仅限admin

---

###### 接口地址

> admin/auth/setAuthTable

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | type | 是 | string | 传 '超级管理员' '校医' 'notNeedFilter'分别对应超为级管理员、校医、均不用过滤 |
> | authArr | 是 | string | 数组字符串，必须用JSON.stringify处理过 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | msg | String | 提示信息 |
>


## 后台用户重置密码

---

##### 请求说明

> 仅限后台用户

---

###### 接口地址

> admin/user/resetPassword

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | username | 是 | string | 用户名 |
> | password | 是 | string | 密码 |
> | type | 否 | string | 不传：后台用户重置密码；传 'userInfo'：校医、学生、教师重置密码 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | msg | String | 提示信息 |
>


## 根据类型获取用户

---

##### 请求说明

---

###### 接口地址

> admin/user/getUserByType

###### 请求方法

> GET

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | type | 是 | string | admin：后台超级管理员；adminDoctor：后台校医；doctor：校医；teacher：教师；student：学生 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>


## 删除后台用户

---

##### 请求说明

---

###### 接口地址

> admin/user/removeUser

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | username | 是 | string | 用户名 |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>


## 增加后台用户

---

##### 请求说明

---

###### 接口地址

> admin/user/addAdminOrDoctor

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | username | 是 | string | 用户名（长度2到16）|
> | password | 是 | string | 密码（长度6到16）  |
> | type | 是 | string | admin：超级管理员；doctor：校医  |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>


## 验证token

---

##### 请求说明

---

###### 接口地址

> admin/user/getUserInfo

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | data | Object | 数据 |
> | msg | String | 提示信息 |
>


## 用户登录

---

##### 请求说明

---

###### 接口地址

> admin/user/login

###### 请求方法

> POST

###### 请求参数

> | 字段 | 是否必传 | 类型 | 说明 |
> | :--- | :--- | :--- | :--- |
> | username | 是 | string | 用户名|
> | password | 是 | string | 密码  |

---

##### 返回数据说明

> 以json格式返回数据

---

###### 字段说明

> | 字段 | 类型 | 说明 |
> | :--- | :--- | :--- |
> | code | Int | 状态码 |
> | token | Object | token |
> | msg | String | 提示信息 |
>
