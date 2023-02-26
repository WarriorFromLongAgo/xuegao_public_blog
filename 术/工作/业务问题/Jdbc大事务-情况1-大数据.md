前情提要
本片短文需要有一定JVM的知识才可以阅读
本片短文需要有一定spring与spring事务的知识才可以阅读

定义常量
下文中的JVM问题，特指OOM或者CPU100%

文章主体
大事务的定义
在查看搜索引擎上的大事务问题文章时，基本上都是介绍的代码与MySQL相关，那我们来说一下纯粹的代码中需要注意的大事务问题
在工作中，我们经常会遇到JVM问题，在开始的时候，我以为ta离我们很远，实际上这些问题遍布在我们的每一行代码中
大事务是引起JVM问题的常见错误
大事务问题的常见定义：运行时间比较长，操作的数据比较多的事务我们称之为大事务。

业务代码实战
我们经常会接收到一些CRUD列表的需求，甚至需求评审的时候说，”我不要分页“
产品虽然经常这么说，但是很多时候未必知道在真正的场景下，这个列表的数据量有多少。如果是预测100条，
变成了1W条还是可以接受的，但是万一变成了10W，100W，我们的系统瞬间就会出现JVM问题，导致部分或者全部服务挂掉，影响整个业务线

场景1
将数据库列表数据直接返回
/**
* 列表数据
* 
* @return java.util.List<com.xuegao.springboot_tool.model.doo.Product>
* @author xuegao
* @date 2021/12/4 23:50
*/
public List<Product> listService() {
// 省去一些业务校验代码
List<Product> list = super.list();
return list;
}

场景2
保存的时候，要和入参的数据进行对比，确保单条数据的唯一性，那么我们势必要将数据库的数据全部查出来，然后进行对比
public void saveService(List<Product> inputList) {
// 省去一些业务校验代码

        // 1，从db中获取数据的所有数据
        List<Product> dbList = super.list();
        // 2，从缓存中获取数据库的所有数据
        List<Product> cacheList = new ArrayList<>();

        this.checkUnique(inputList, dbList, Boolean.TRUE);

        super.saveBatch(inputList);
    }

    public void updateService(List<Product> inputList) {
        // 省去一些业务校验代码

        // 1，从db中获取数据的所有数据
        List<Product> dbList = super.list();
        // 2，从缓存中获取数据库的所有数据
        List<Product> cacheList = new ArrayList<>();

        this.checkUnique(inputList, cacheList, Boolean.FALSE);

        super.saveBatch(inputList);
    }

    /**
     * 校验数据的唯一性
     *
     * @param inputList:
     * @param dbList:
     * @param saveOrUpdate:
     * @author xuegao
     * @date 2021/12/5 11:43
     */
    private void checkUnique(List<Product> inputList, List<Product> dbList, boolean saveOrUpdate) {
        dbList.addAll(inputList);

        // 修改记得要剥离自己

        for (Product product : inputList) {
            this.checkUniqueCore(product, dbList);
        }
    }

    private void checkUniqueCore(Product product, List<Product> dbList) {
        dbList = dbList.stream().filter(p -> p.getName().equals(product.getName()))
                .collect(Collectors.toList());
        dbList = dbList.stream().filter(p -> p.getDescription().equals(product.getDescription()))
                .collect(Collectors.toList());
        if (dbList.size() > 0) {
            throw new RuntimeException("数据已存在");
        }
    }
第一个场景和第二个场景下，假如我们的数据量突然从100攀升到1W，就会对服务产生一定的影响，假如攀升到10W，就会引发JVM问题

结论：我们一次性将数据库或者缓存中的所有数据全部加载到内存是不合适的

我们应该如何做
1，第一步必须和产品，和业务方确定数据量，根据不同的量级设计方案

2，在做列表的时候，尽量不要使用selectlist方案
采用分页方案，根据服务器，选择一个当前页展示多少条的数字（前端需要设计组件）
和产品沟通，尽量少的设计不需要分页的页面

3，save和update的唯一性校验
3.1，如果数据量少，可以直接使用如上代码所示
如果数据量多
3.2，可以选择将数据库的数据分批查出来进行和入参数据对比
3.3，可以选择根据一些唯一表示，只查出和入参在同一个标识的数据，进行唯一性校验


