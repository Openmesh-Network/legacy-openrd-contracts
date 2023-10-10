// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {DAOFactory} from "@aragon/osx/framework/dao/DAOFactory.sol";

bytes32 constant MANAGE_SUBDAO_PERMISSION_ID = keccak256(
    "MANAGE_SUBDAO_PERMISSION"
);

interface ISubDAO {
    error IndexOutOfBound(uint256 index, uint256 count);

    event SubDAOAdded(address subdao);
    event SubDAORemoved(address subdao);

    /// @notice Creates a new DAO and adds it as sub DAO.
    /// @param _daoFactory The DAO factory to use to create the DAO.
    /// @param _daoSettings The settings for creating the new DAO.
    /// @param _pluginSettings The plugins to install in the new DAO.
    function createSubDAO(
        DAOFactory _daoFactory,
        DAOFactory.DAOSettings calldata _daoSettings,
        DAOFactory.PluginSettings[] calldata _pluginSettings
    ) external;

    /// @notice Adds an existing DAO as sub DAO.
    /// @param _subDAO The address of the DAO to add as sub DAO.
    function addSubDAO(address _subDAO) external;

    /// @notice Removes an existing DAO as sub DAO.
    /// @param _index The index of the DAO to remove as sub DAO.
    /// @dev If removing multiple in the same transaction, do it back to front (highest index first).
    function removeSubDAO(uint256 _index) external;

    /// @notice Gets the amount of sub DAOs currently added to this DAO.
    function getSubDAOCount() external view returns (uint256 count);

    /// @notice Gets the address of a currently added sub DAO at a specific index.
    /// @param _index The index of the sub DAO that you want the address of.
    function getSubDAO(uint256 _index) external view returns (address subDAO);

    /// @notice Gets the address of all currently added sub DAOs.
    function getSubDAOs() external view returns (address[] memory subDAOArray);
}
