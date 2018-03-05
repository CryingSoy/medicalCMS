## 验证token

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
