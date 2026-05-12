import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log("handleShow");
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Order management
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Recent orders
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review order totals, shipping details, and current status.
            </p>
          </div>

          <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
            {totalOrders} total orders
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-max w-full table-auto">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50 text-slate-600 uppercase text-xs tracking-[0.18em]">
                <th
                  className="py-4 px-6 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: "id",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Order#{" "}
                  {sort._sort === "id" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                    ))}
                </th>
                <th className="py-4 px-6 text-left">Items</th>
                <th
                  className="py-4 px-6 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: "totalAmount",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Total Amount{" "}
                  {sort._sort === "totalAmount" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                    ))}
                </th>
                <th className="py-4 px-6 text-center">Shipping Address</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 text-sm font-light">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span className="font-semibold text-slate-900">
                        {order.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-left align-top">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="mb-2 flex items-center gap-2 last:mb-0"
                      >
                        <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-white">
                          <img
                            className="h-full w-full object-cover"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        </div>
                        <span className="text-slate-600">
                          {item.title} - #{item.quantity} - $
                          {discountedPrice(item)}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-6 text-center align-top">
                    <div className="flex items-center justify-center">
                      <span className="font-semibold text-slate-900">
                        ${order.totalAmount}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center align-top">
                    <div className="space-y-1 text-sm text-slate-600">
                      <div>
                        <strong className="text-slate-900">
                          {order.selectedAddress.name}
                        </strong>
                        ,
                      </div>
                      <div>{order.selectedAddress.street},</div>
                      <div>{order.selectedAddress.city}, </div>
                      <div>{order.selectedAddress.state}, </div>
                      <div>{order.selectedAddress.pinCode}, </div>
                      <div>{order.selectedAddress.phone}, </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center align-top">
                    {order.id === editableOrderId ? (
                      <select
                        onChange={(e) => handleUpdate(e, order)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`${chooseColor(
                          order.status,
                        )} inline-flex rounded-full px-3 py-1 text-xs font-semibold`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center align-top">
                    <div className="flex item-center justify-center">
                      <div className="w-6 mr-4 transform hover:text-indigo-500 hover:scale-110">
                        <EyeIcon
                          className="w-7 h-7"
                          onClick={(e) => handleShow(order)}
                        ></EyeIcon>
                      </div>
                      <div className="w-6 mr-2 transform hover:text-indigo-500 hover:scale-110">
                        <PencilIcon
                          className="w-7 h-7"
                          onClick={(e) => handleEdit(order)}
                        ></PencilIcon>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6">
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </div>
  );
}

export default AdminOrders;
