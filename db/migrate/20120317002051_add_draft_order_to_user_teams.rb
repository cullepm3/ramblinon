class AddDraftOrderToUserTeams < ActiveRecord::Migration
  def change
    add_column :user_teams, :draft_order, :integer

  end
end
