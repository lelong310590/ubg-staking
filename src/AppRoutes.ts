import Router from "next/router";

export const AppRoutes = {
  // Public
  home: {
    href: '/',
    renderPath: function () {
      return this.href
    },
    push: function () {
      return Router.push(this.href, this.renderPath())
    }
  },
}