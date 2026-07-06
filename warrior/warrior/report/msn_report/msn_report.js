// Copyright (c) 2026, Abhishek Dubey and contributors
// For license information, please see license.txt

frappe.query_reports["MSN Report"] = {
	 filters: [

        {
            fieldname: "warehouse",
            label: "Warehouse",
            fieldtype: "Link",
            options: "Warehouse"
        },
        {
            fieldname: "item",
            label: "Item",
            fieldtype: "Link",
            options: "Item"
        },
        {
            fieldname: "brand",
            label: "Brand",
            fieldtype: "Link",
            options: "Brand"
        },
        {
            fieldname: "item_status",
            label: "Item Status",
            fieldtype: "Select",
            options: "\nEnabled\nDisabled",
            default: "Enabled"
        }
    ],
     formatter: function(value, row, column, data, default_formatter) {
        value = default_formatter(value, row, column, data);

        if (!data) {
            return value;
        }

        // Color Item Status cell
        if (column.fieldname === "item_status") {
            if (data.item_status === "Disabled") {
                value = `<span style="color:red;font-weight:bold;">${value}</span>`;
            } else {
                value = `<span style="color:green;font-weight:bold;">${value}</span>`;
            }
        }

        // Color Available Qty cell if less than or equal to MSL Qty
        if (column.fieldname === "available_qty") {
            if (flt(data.available_qty) <= flt(data.msl_qty)) {
                value = `<span style="background:#ffcccc;color:#b30000;font-weight:bold;padding:3px 8px;border-radius:4px;">${value}</span>`;
            }
        }

        // Color full row if item disabled
        if (data.item_status === "Disabled") {
            value = `<span style="background:#ffe5e5;display:block;width:100%;">${value}</span>`;
        }

        return value;
    }
};
